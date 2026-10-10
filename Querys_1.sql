SELECT streamer.name AS streamer,
streamer.total_followers AS seguidores,
streamer.total_views AS vistas
FROM streamer
WHERE streamer.total_followers > 1000000
AND streamer.total_views > 100000000
ORDER BY streamer.total_followers DESC
LIMIT 10;