SELECT language.name_language AS idioma,
AVG(streamer.total_followers) AS promedio_seguidores,
COUNT(*) AS total_streamers
FROM streamer
INNER JOIN language ON language.idlanguage = streamer.language_idlanguage
GROUP BY language.idlanguage, language.name_language
ORDER BY promedio_seguidores DESC
LIMIT 15;