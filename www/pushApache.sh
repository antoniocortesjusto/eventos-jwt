rm -rf /Library/WebServer/Documents/*
cp -r /Users/Antonio/eventos/www  /Library/WebServer/Documents/
apachectl graceful