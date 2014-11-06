rm -rf /Library/WebServer/Documents/*
cp -r /Users/Antonio/eventos-jwt/www  /Library/WebServer/Documents/
apachectl graceful