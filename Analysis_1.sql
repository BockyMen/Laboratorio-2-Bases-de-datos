SELECT game.name AS juego,
COUNT(DISTINCT principal.name) AS juego_principal,
COUNT(DISTINCT secundario.name) AS juego_segunda_opcion
FROM game
LEFT JOIN streamer AS principal ON principal.game_1 = game.idgame
LEFT JOIN streamer AS secundario ON secundario.game_2 = game.idgame
GROUP BY game.idgame, game.name
ORDER BY juego_principal DESC, juego_segunda_opcion DESC
LIMIT 15;