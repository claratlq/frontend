FROM registry.gitlab.com/gaia6974605/images/haproxy22:v2.2.31

COPY --chown=haproxy:haproxy haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY --chown=haproxy:haproxy cors.lua /usr/local/etc/haproxy/cors.lua

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]
