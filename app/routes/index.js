import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
        return {
      "data": [
        {
          "name": "smss.exe",
          "id": 1,
          "device": "Stark",
          "path": "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
          "status": "scheduled"
        },
        {
          "name": "netsh.exe",
          "id": 2,
          "device": "Targaryen",
          "path": "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
          "status": "available"
        },
        {
          "name": "uxtheme.dll",
          "id": 3,
          "device": "Lannister",
          "path": "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
          "status": "available"
        },
        {
          "name": "cryptbase.dll",
          "id": 4,
          "device": "Martell",
          "path": "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
          "status": "scheduled"
        },
        {
          "name": "7za.exe",
          "id": 5,
          "device": "Baratheon",
          "path": "\\Device\\HarddiskVolume1\\temp\\7za.exe",
          "status": "scheduled"
        }
      ]
    };
  }
}
