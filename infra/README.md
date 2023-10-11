# Docker Compose configuration using Nginx as a reverse proxy for a frontend container

## Nginx Reverse Proxy Configuration

The [nginx configuration](./nginx/frontend.conf) acts as a Nginx reverse proxy configuration that redirects HTTP traffic to HTTPS and proxies requests to a frontend application running on a separate container.

### Prerequisites

Before using this configuration, ensure that you have the following:
- SSL certificate and private key files (nginx.crt and nginx.key) placed in the /certs directory.

To generate a private key and self-signed certificate:
```sh
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./certs/nginx.key -out ./certs/nginx.crt
```

### Explanation

This configuration consists of two server blocks:

1. The first server block listens on port 8080 and issues a 301 redirect to the equivalent HTTPS URL. It redirects all incoming HTTP requests to https://$host:8443$request_uri.

1. The second server block listens on port 8443 (HTTPS) and includes the SSL certificate and key files (/certs/nginx.crt and /certs/nginx.key). It also configures SSL session caching, session timeout, and cipher settings for secure communication.

The location / block within the second server block defines the proxy settings. It proxies requests to the frontend application running on the frontend service at http://frontend:3000. It also sets the necessary headers (Host, X-NginX-Proxy, X-Real-IP, X-Forwarded-For) to ensure proper request forwarding.

### Note

Remember to adjust the service name (frontend), the ports used in the redirect (port 8443 in this example), and the SSL certificate paths as per your requirements.
