FROM node:12 AS build-stage

WORKDIR /frontend
COPY frontend/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://ecohub.herokuapp.com/

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.8

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV SECRET_KEY=2708f438-c031-4973-b7b5-cb26ed206abb
ENV WEATHER_API_KEY=0764e0f6e3ff32e1571f8aece8f882d4
ENV AWS_ACCESS_KEY_ID=AKIAIL54SZ7EONUPIHRQ
ENV AWS_SECRET_ACCESS_KEY=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

EXPOSE 8000

WORKDIR /var/www
COPY backend/. .
COPY --from=build-stage /frontend/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn app:app
