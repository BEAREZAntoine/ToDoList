.PHONY: all backend frontend up down clean

up:
	docker compose up -d

install: 
	npm install
	cd todo-frontend && npm install

backend:
	npm run start &

frontend:
	cd todo-frontend && npm run serve &

down:
	docker compose down

clean:
	docker compose down -v
