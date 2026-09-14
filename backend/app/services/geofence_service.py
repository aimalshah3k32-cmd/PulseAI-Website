import math
from typing import Tuple

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance in meters between two points 
    on the earth (specified in decimal degrees).
    """
    R = 6371000  # Radius of earth in meters
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return round(distance, 2)

def is_within_geofence(
    shopper_lat: float, 
    shopper_lng: float, 
    target_lat: float, 
    target_lng: float, 
    radius_meters: float = 150.0
) -> Tuple[bool, float]:
    """
    Checks if shopper GPS coordinates are within target location geofence radius.
    Returns (is_valid, distance_in_meters).
    """
    dist = calculate_haversine_distance(shopper_lat, shopper_lng, target_lat, target_lng)
    return (dist <= radius_meters, dist)
