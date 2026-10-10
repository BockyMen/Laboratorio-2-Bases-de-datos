SELECT CASE
WHEN stream.active_days_per_week <= 2 THEN '0 - 2 dias'
WHEN stream.active_days_per_week <= 4 THEN '3 - 4 dias'
WHEN stream.active_days_per_week <= 6 THEN '5 - 6 dias'
ELSE '7 dias'
END AS rango_de_dias_activos_por_semana,
COUNT(*) AS cantidad_de_streamers_en_el_rango,
AVG(stream.avg_viewers_per_stream) AS promedio_de_vistas_por_transmision
FROM stream
GROUP BY rango_de_dias_activos_por_semana
ORDER BY MIN(stream.active_days_per_week);