# mydiary
gcloud config set project mydiary-dev-5daf0
gcloud run deploy dev-mydiary-service --region=asia-northeast3 --set-env-vars=TARGET=qa --source=. --tag v1-0-0