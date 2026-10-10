SELECT streamer.name AS streamer,
language.name_language AS idioma,
game.name AS juego_principal,
stream.avg_viewers_per_stream AS espectadores_por_transmision
FROM streamer
INNER JOIN language ON language.idlanguage = streamer.language_idlanguage
INNER JOIN game ON game.idgame = streamer.game_1
INNER JOIN stream ON stream.streamer_name = streamer.name
ORDER BY stream.avg_viewers_per_stream DESC
LIMIT 10;