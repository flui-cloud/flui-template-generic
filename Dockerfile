# #flui-managed
# syntax=docker/dockerfile:1.6

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 generic

COPY --chown=generic:nodejs package.json server.js ./

USER generic

EXPOSE 3000

CMD ["node", "server.js"]
