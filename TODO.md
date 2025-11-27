# Task: Fix missing 'allauth' module error and test backend

## Steps to Fix:
1. Activate the backend virtual environment:
   - Windows: `backend\\venv\\Scripts\\activate`
2. Install django-allauth package:
   ```
   pip install django-allauth
   ```
3. (Optional) Add `django-allauth` to `backend/requirements.txt` for future installations.
4. Run Django migrations to apply any changes:
   ```
   python manage.py migrate
   ```

## Critical-Path Testing Plan:
1. Test user registration endpoint (`/dj-rest-auth/registration/`) to ensure new user signup works.
2. Test user login endpoint (`/dj-rest-auth/login/`) with valid credentials.
3. Test user logout endpoint (`/dj-rest-auth/logout/`).
4. Test social account login flow (Google provider), checking correct redirection and data.
5. Confirm no import or module errors occur during these tests.
6. Check server logs for any warnings or errors related to authentication.

Please confirm if this plan looks good and if you want me to assist you with detailed instructions or code changes next.
