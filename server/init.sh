#!/bin/sh

if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] && [ -n "$DJANGO_SUPERUSER_EMAIL" ] ; then
  (python manage.py createsuperuser --no-input)
fi
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
