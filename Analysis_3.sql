SELECT streamer_principal.name AS Streamer_Principal, juego_principal.name AS Juego_Principal, streamer_secundario.name AS Streamer_Secundario,
juego_secundario.name AS Juego_Secundario, streamer_principal.total_followers AS Seguidores_Principal,
streamer_secundario.total_followers AS Seguidores_Secundario, streamer_principal.total_views AS Vistas_Principal,
streamer_secundario.total_views AS Vistas_Secundario
FROM streamer AS streamer_principal
INNER JOIN game AS juego_principal
ON juego_principal.idgame = streamer_principal.game_1
INNER JOIN streamer AS streamer_secundario
ON streamer_secundario.game_2 = streamer_principal.game_1
AND streamer_secundario.name <> streamer_principal.name
AND streamer_secundario.total_followers <> streamer_principal.total_followers
AND streamer_secundario.total_views <> streamer_principal.total_views
INNER JOIN game AS juego_secundario
ON juego_secundario.idgame = streamer_secundario.game_2
WHERE streamer_principal.total_views > 0
AND streamer_secundario.total_views > 0
ORDER BY juego_principal.name,
streamer_principal.total_followers DESC,
streamer_secundario.total_followers DESC
LIMIT 15;