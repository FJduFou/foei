startup = {
  process: function (method, data) {
    if (trace) {
      console.log(data);
    }
    switch (method) {
      case 'getData':
        // Check for Arc bonus as we need it for our calculations
        var entities = data.city_map.entities;
        for (var i = 0; i < entities.length; i++) {
          if (entities[i].cityentity_id === 'X_FutureEra_Landmark1') {
            if (debug) {
              console.log('Arc', entities[i]);
            }
            greatBuilding.setArcBonus(entities[i].bonus.value);
          }
        }

        var goods = {};
        var goodsList = data.goodsList;
        for (var i = 0; i < goodsList.length; i++) {
          // good =
          // goods[]
        }
        break;
      default:
        if (trace || debug) {
          console.log('startupService.' + method + ' is not used');
        }
    }
  }
};
