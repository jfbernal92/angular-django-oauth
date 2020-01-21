release: python manage.py migrate
web: gunicorn backend.wsgi -b 0.0.0.0:$PORT
