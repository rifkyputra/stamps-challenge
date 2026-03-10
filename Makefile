.PHONY: setup install task1 task2 all clean preview

setup:
	@if ! command -v node > /dev/null 2>&1; then \
		echo "Installing Node.js via nvm..."; \
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash; \
		export NVM_DIR="$$HOME/.nvm"; \
		. "$$NVM_DIR/nvm.sh"; \
		nvm install --lts; \
	else \
		echo "Node.js already installed: $$(node -v)"; \
	fi

install: setup
	npm install

task1:
	npx tsx task1.ts

task2:
	@if [ -z "$(API_KEY)" ]; then \
		echo "Usage: make task2 API_KEY=your_key"; \
		exit 1; \
	fi
	API_KEY=$(API_KEY) npx tsx task2.ts

all: task1 task2

preview:
	open docs/index.html

clean:
	rm -rf node_modules dist
