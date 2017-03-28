#!/bin/bash
test -z $1 && echo "need magnet link! $0 <magnet link>" && exit -1

HOST=IP
PORT=PORT
USER=ID
# NOTE: I had issues using passwords with semicolons (;) in them, 
#       you might want to stay away from them
PASS=PASSWORD
 
LINK="$1"
# set true if you want every torrent to be paused initially
#PAUSED="true"
PAUSED="false"
SESSID=$(curl --silent --anyauth --user $USER:$PASS "http://$HOST:$PORT/transmission/rpc" | sed 's/.*<code>//g;s/<\/code>.*//g')
curl --silent --anyauth --user $USER:$PASS --header "$SESSID" "http://$HOST:$PORT/transmission/rpc" -d "{\"method\":\"torrent-add\",\"arguments\":{\"paused\":${PAUSED},\"filename\":\"${LINK}\"}}"
