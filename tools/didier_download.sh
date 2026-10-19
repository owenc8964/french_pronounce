#!/bin/zsh
# 慢速下載 e-didier.fr 的 Édito A2 課本（neda2）與 Cahier（neda2c）音檔：
# 一次一個、限速 2MB/s、檔與檔之間停 10 秒；可重跑（大小對得上的檔會跳過）
# ⚠️ zsh 的 $path 綁著 $PATH，變數不可以叫 path
OUT="$1"; LOG="$OUT/download_log.tsv"
fetch(){ # $1=前綴 $2=子資料夾 $3=最後一軌
  for n in $(seq 1 $3); do
    code=$1$(printf %03d $n)
    apath=$(curl -s --max-time 30 "https://e-didier.fr/code/$code" | grep -o 'datas/[0-9]*/[A-Za-z0-9_.-]*\.mp3' | head -1)
    if [ -z "$apath" ]; then printf "%s\tNO_AUDIO\n" $code >> $LOG; sleep 3; continue; fi
    url="https://e-didier.fr/$apath"; f="$OUT/$2/$(printf %03d $n).mp3"
    want=$(curl -sI --max-time 30 "$url" | awk 'tolower($1)=="content-length:"{print $2}' | tr -d '\r')
    if [ -f "$f" ] && [ "$(stat -f %z "$f")" = "$want" ]; then continue; fi
    curl -s --max-time 600 --limit-rate 2M -o "$f" "$url"
    got=$(stat -f %z "$f" 2>/dev/null)
    st=SIZE_MISMATCH; [ "$got" = "$want" ] && st=OK
    printf "%s\t%s\t%s\t%s\t%s\n" $code $apath $want $got $st >> $LOG
    sleep 10
  done
}
fetch neda2 a2 145
fetch neda2c a2c 127
echo DONE >> $LOG
