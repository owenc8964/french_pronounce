#!/bin/zsh
# 等 A2＋Cahier 的下載跑完（log 出現 DONE）才開始抓 B1，同樣一次一個、限速 2MB/s、間隔 10 秒
# ⚠️ zsh 的 $path 綁著 $PATH，變數不可以叫 path
RAW="$1"; A2LOG="$RAW/download_log.tsv"; LOG="$RAW/download_log_b1.tsv"
until grep -q '^DONE' "$A2LOG" 2>/dev/null; do sleep 30; done
mkdir -p "$RAW/b1"
for n in $(seq 1 98); do
  code=nedb1$(printf %03d $n)
  apath=$(curl -s --max-time 30 "https://e-didier.fr/code/$code" | grep -o 'datas/[0-9]*/[A-Za-z0-9_.-]*\.mp3' | head -1)
  if [ -z "$apath" ]; then printf "%s\tNO_AUDIO\n" $code >> $LOG; sleep 3; continue; fi
  url="https://e-didier.fr/$apath"; f="$RAW/b1/$(printf %03d $n).mp3"
  want=$(curl -sI --max-time 30 "$url" | awk 'tolower($1)=="content-length:"{print $2}' | tr -d '\r')
  if [ -f "$f" ] && [ "$(stat -f %z "$f")" = "$want" ]; then continue; fi
  curl -s --max-time 600 --limit-rate 2M -o "$f" "$url"
  got=$(stat -f %z "$f" 2>/dev/null)
  st=SIZE_MISMATCH; [ "$got" = "$want" ] && st=OK
  printf "%s\t%s\t%s\t%s\t%s\n" $code $apath $want $got $st >> $LOG
  sleep 10
done
echo DONE >> $LOG
