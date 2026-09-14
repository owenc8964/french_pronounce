#!/usr/bin/env python3
"""routine_permission.py — PermissionRequest hook（2026-09-14）

只在「排程 session」生效，互動 session 完全不管（照常跳授權確認問 Owen）。
起因：clb7-game-dawn 兩次卡死（09-14 06:09 卡 8 小時、14:15 再卡）——
  排程用了沒授權的指令，停在授權確認畫面等人按，而 Owen 在睡覺。
Owen 09-14：「routine session 可以開放他上網查資料，遇到沒授權的指令就直接拒絕、
  不跳視窗等人按，被拒絕後它會自己改用別的方法；最好遇到狀況要主動提出需要我開放什麼權限。」

判斷方式：transcript 第一則使用者訊息「以」<scheduled-task 開頭 → 是排程 session。
  ⚠️ 09-14 修：原本是「前 41 行任何地方出現 <scheduled-task」，互動 session 讀了 HANDOFF
  （裡面寫著這個字串）就被誤判成排程，AskUserQuestion 被默默拒絕。只看第一則使用者訊息才準。
  · WebSearch／WebFetch → 放行
  · 其他任何會跳授權確認的工具 → 直接拒絕，訊息要求它改用別的方法，
    並把「需要什麼授權」寫進 GAME_ROADMAP.md 第五節
"""
import json, sys

def is_routine(path):
    try:
        with open(path, encoding='utf-8') as f:
            for line in f:
                try: m = json.loads(line)
                except Exception: continue
                if m.get('type') != 'user': continue
                c = m.get('message', {}).get('content')
                if isinstance(c, list):
                    c = next((b.get('text', '') for b in c if b.get('type') == 'text'), None)
                if c is None: continue
                return c.lstrip().startswith('<scheduled-task')
    except Exception:
        pass
    return False

def main():
    try: data = json.load(sys.stdin)
    except Exception: return
    if not is_routine(data.get('transcript_path', '')): return      # 互動 session：不干涉
    tool = data.get('tool_name', '')
    if tool in ('WebSearch', 'WebFetch'):
        out = {'behavior': 'allow'}
    else:
        detail = json.dumps(data.get('tool_input', {}), ensure_ascii=False)[:160]
        out = {'behavior': 'deny', 'message':
               '排程 session 無人在場，這個指令沒有預先授權，已自動拒絕（不會跳視窗）。'
               '請改用已授權的方法（改檔用 Edit/Write、讀檔用 Read 或 grep/cat/head、'
               '不要在指令前加 cd 前綴）。若這一步非此指令不可，請跳過這一步，'
               '並在 GAME_ROADMAP.md 第五節寫一條「需要 Owen 開放授權：' + tool + ' ' + detail + '」，然後繼續下一項。'}
    print(json.dumps({'hookSpecificOutput': {'hookEventName': 'PermissionRequest', 'decision': out}}, ensure_ascii=False))

main()
