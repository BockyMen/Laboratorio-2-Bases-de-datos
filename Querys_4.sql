SELECT language.name_language AS idioma,
COUNT(*) AS total_streamers
FROM streamer
INNER JOIN language ON language.idlanguage = streamer.language_idlanguage
GROUP BY language.idlanguage, language.name_language
ORDER BY total_streamers DESC
LIMIT 10;