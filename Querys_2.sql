SELECT streamer.name AS streamer,
streamer.total_followers AS seguidores
FROM streamer
INNER JOIN language ON language.idlanguage = streamer.language_idlanguage
WHERE language.name_language = 'Spanish'
ORDER BY streamer.total_followers DESC
LIMIT 10;