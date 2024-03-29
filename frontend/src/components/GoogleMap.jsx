import React, { useState, useEffect } from "react";

let map;
let markers = [];

export const plotPoints = (points = []) => {
  markers.forEach((_) => {
    _.setMap(null);
  });
  markers = [];

  function getMarkerIcon(color) {
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      scale: 8,
      strokeColor: "white",
      strokeWeight: 2,
    };
  }

  points.forEach(function (point) {;
    var marker = new window.google.maps.Marker({
      position: { lat: point.lat, lng: point.lng },
      map: map,
      title: point.info,
      icon: getMarkerIcon(point.color),
    });

    markers.push(marker);

    marker.addListener("click", function () {
      var infoWindow = new window.google.maps.InfoWindow({
        content: point.info,
      });
      infoWindow.open(map, marker);
    });
  });
}

export const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.5, lng: 35.2201 },
    zoom: 8,
  });
};

export const GoogleMap = () => {
  useEffect(() => {
    const loadMap = async () => {
      try {
        const apiKey = "AIzaSyAqoZN1fgWknLiM_nYOb4WOKKlHF0JbU34"; // Replace with your API key
        const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization&callback=initMap`;
        await loadScript(apiUrl);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = () => {
          initMap([]);
          resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadMap();
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default GoogleMap;