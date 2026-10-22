#!/bin/sh
# One video: info json + English subs + 360p mp4, serialised for ALL agents on .yt.lock with a pause after each.
# usage: ./ytget.sh ID [ID ...]   (runs from anywhere; files land in private/{meta,transcripts,video})
D=$(cd "$(dirname "$0")" && pwd)
for id in "$@"; do
  lockf -t 7200 "$D/.yt.lock" sh -c "
    '$D/ytdl' --sleep-requests 2 --write-info-json --write-subs --write-auto-subs --sub-langs 'en,en-orig,en-US' --sub-format vtt \
      -f 'bv*[height<=360]+ba/b[height<=360]/b' --merge-output-format mp4 \
      -o 'private/video/%(id)s.%(ext)s' -o 'infojson:private/meta/%(id)s' -o 'subtitle:private/transcripts/%(id)s' \
      -P '$D' 'https://www.youtube.com/watch?v=$id' > '$D/private/ytget-$id.log' 2>&1; echo \"$id exit \$?\"; sleep 25"
done
