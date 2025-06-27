class Remote {
  constructor(device) {
    this.device = device;
    this.device = device;
  }

  togglePower() {
    console.log("Toggling power on the device.");

    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumneDown() {
    console.log("Decreasing volume on the device.");

    const volume = this.device.getVolume();
    this.device.setVolume(volume - 1);
  }

  volumneUp() {
    console.log("Increasing volume on the device.");

    const volume = this.device.getVolume();
    this.device.setVolume(volume + 1);
  }

  channelDown() {
    console.log("Changing channel down on the device.");

    const channel = this.device.getChannel();
    this.device.setChannel(channel - 1);
  }

  channelUp() {
    console.log("Changing channel up on the device.");

    const channel = this.device.getChannel();
    this.device.setChannel(channel + 1);
  }
}

class TV {
  enabled = false;
  volume = 10;
  channel = 1;

  isEnabled() {
    return this.enabled;
  }

  enable() {
    this.enabled = true;
    console.log("TV is now enabled.");
  }

  disable() {
    this.enabled = false;
    console.log("TV is now disabled.");
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume) {
    this.volume = volume;
    console.log(`TV volume set to ${this.volume}.`);
  }

  getChannel() {
    return this.channel;
  }

  setChannel(channel) {
    this.channel = channel;
    console.log(`TV channel set to ${this.channel}.`);
  }
}

class Radio {
  enabled = false;
  volume = 5;
  channel = 101;

  isEnabled() {
    return this.enabled;
  }

  enable() {
    this.enabled = true;
    console.log("Radio is now enabled.");
  }

  disable() {
    this.enabled = false;
    console.log("Radio is now disabled.");
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume) {
    this.volume = volume;
    console.log(`Radio volume set to ${this.volume}.`);
  }

  getChannel() {
    return this.channel;
  }

  setChannel(channel) {
    this.channel = channel;
    console.log(`Radio channel set to ${this.channel}.`);
  }
}

class ExtendedRemote extends Remote {
  volumneDown() {
    console.log("Mute volume on the extended remote.");

    this.device.setVolume(0);
  }

  volumneUp() {
    console.log("Unmute on the extended remote.");

    this.device.setVolume(100);
  }
}

function clientCode(remote) {
  remote.togglePower();
  remote.volumneUp();
  remote.channelUp();
  remote.volumneDown();
  remote.channelDown();
  remote.togglePower();
}

const tv = new TV();
const tvRemote = new Remote(tv);
clientCode(tvRemote);

console.log("\n---\n");

const radio = new Radio();
const radioRemote = new Remote(radio);
clientCode(radioRemote);

console.log("\n---\n");

const extendedTvRemote = new ExtendedRemote(tv);
clientCode(extendedTvRemote);
