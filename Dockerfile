# Multi-stage build for Ma-Ticko application
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY dirt_stack/frontend/package*.json ./
RUN npm ci

COPY dirt_stack/frontend/ ./
RUN npm run build

# Python backend stage
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY dirt_stack/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY dirt_stack/backend/ ./

# Fix ALLOWED_HOSTS for container deployment
RUN sed -i "s/ALLOWED_HOSTS = \[.*\]/ALLOWED_HOSTS = ['*']/" dirt_project/settings.py

# Create media directory and copy files
RUN mkdir -p ./media
COPY dirt_stack/backend/media/*.png ./media/
COPY dirt_stack/backend/media/*.svg ./media/

# Copy frontend build from previous stage
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist/

# Setup Django template
RUN cp templates/app.template.html templates/app.html

# Copy and run asset update script
COPY dirt_stack/update_assets.py ../
RUN echo "Before asset update:" && cat templates/app.html
RUN echo "Frontend dist contents:" && ls -la ../frontend/dist/assets/
RUN python ../update_assets.py
RUN echo "After asset update:" && cat templates/app.html

# Collect static files
RUN python manage.py collectstatic --noinput

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]