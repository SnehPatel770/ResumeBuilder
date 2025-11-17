@echo off
echo ========================================
echo Testing Gemini API Connection
echo ========================================
echo.

echo Testing API key from backend/.env file...
echo.

curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBQRrQFuvFzwQnsRoSI3FcMjeVN1vbwnuY" ^
  -H "Content-Type: application/json" ^
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Say hello\"}]}]}"

echo.
echo.
echo ========================================
echo Test Complete
echo ========================================
echo.
echo If you see a response with "candidates", the API key works!
echo If you see an error, check the message above.
echo.
pause
