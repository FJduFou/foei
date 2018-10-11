var rewardUpdateInterval;

function updateRewards (rewards) {
  clearInterval(rewardUpdateInterval);
  var start = new Date().getTime();

  if (rewards.length > 0) {
    rewardUpdateInterval = setInterval(function () {
      var now = new Date().getTime();
      updateRewardsDetails((now - start) / 1000, rewards);
    }, 500);
  }
}

function updateRewardsDetails (timePassed, rewards) {
  rewardsRows = '';
  hasActiveUncommon = false;
  hasActive = false;
  hasInactive = false;
  for (var i = 0; i < rewards.length; i++) {
    rewardsRows += addRewardRow(timePassed, rewards[i]);
    if (rewards[i].active !== true) {
      if (secondsTime(rewards[i].active) - timePassed < 1) {
        hasActive = true;
        hasActiveUncommon |= isUncommon(rewards[i]);
      } else {
        hasInactive = true;
      }
    } else {
      hasActive = true;
      hasActiveUncommon |= isUncommon(rewards[i]);
    }
  }
  if (rewardsRows == '') {
    rewardsRows = '<td colspan="4">No rewards available</td>';
  }
  $('#rewards-body').html(rewardsRows);

  updateRewardsTab(hasActive, hasActiveUncommon);
  if (!hasInactive) {
    clearInterval(rewardUpdateInterval);
    rewardUpdateInterval = undefined;
  }
}

function updateRewardsTab (active, uncommon) {
  $('#rewards-tab').html((active ? '<i style="color: ' + (uncommon ? 'green' : 'orange') + '" class="fas fa-exclamation-triangle"></i> ' : '') + 'Rewards');
}

function addRewardRow (timePassed, reward) {
  activeInfo = '<i style="color: green" class="fas fa-check"></i>';
  if (hasRowTime(reward.active, timePassed)) {
    activeInfo = humanReadableTime(secondsTime(reward.active) - timePassed);
  }

  row = '<tr><td>' + activeInfo + '</td><td>' + reward.rarity + '</td><td>' + rewardType(reward.type) + '</td><td>' + reward.position + '</td></tr>';

  return row;
}

function isUncommon (reward) {
  return reward.rarity == 'uncommon' || reward.type == 'ge_relic_rare' || reward.type == 'ge_relic_uncommon';
}

function hasRowTime (active, timePassed) {
  if (active === true) {
    return false;
  }
  return secondsTime(active) - timePassed > 1;
}

function rewardType (type) {
  if (incidents.hasOwnProperty(type)) {
    return '<img style="height:50px;" title="' + type + '" src="/ui/icons/hr/' + type + '.png"></td><td>' + incidents[type];
  }
  return '</td><td>' + type;
}

var incidents = {
  'ge_relic_rare': 'rare relic',
  'ge_relic_common': 'common relic',
  'ge_relic_uncommon': 'uncommon relic',
  'incident_beehive': 'beehive',
  'incident_broken_cart': 'broken cart',
  'incident_crates': 'crates',
  'incident_blocked_road_2x2': 'blocked road',
  'incident_castaway': 'castaway',
  'incident_clothesline': 'clothesline',
  'incident_dinosaur_bones': 'dinosaur bones',
  'incident_fallen_tree_1x1': 'fallen tree',
  'incident_fallen_tree_2x2': 'fallen tree',
  'incident_fruit_vendor': 'fruit vendor',
  'incident_flotsam': 'flotsam',
  'incident_kite': 'kite in tree',
  'incident_mammoth_bones': 'mammoth bones',
  'incident_overgrowth': 'overgrowth',
  'incident_pothole_2x2': 'pothole',
  'incident_rhino': 'rhino',
  'incident_sculptor': 'sculptor',
  'incident_sos': 'SOS',
  'incident_statue': 'statue',
  'incident_stick_hut': 'stick hut',
  'incident_treasure_chest': 'treasure chest',
  'incident_wine_cask': 'wine casks'
};
