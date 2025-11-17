@echo off
echo ========================================
echo Listing Available Gemini Models
echo ========================================
echo.

echo Checking which models are available for your API key...
echo.

curl "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBQRrQFuvFzwQnsRoSI3FcMjeVN1vbwnuY"

echo.
echo.
echo ========================================
echo.
echo If you see a list of models, your API key works!
echo If you see an error, the API key might be invalid.
echo.
pause
