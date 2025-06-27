class Remote {
  constructor(protected device: Device) {
    this.device = device;
  }

  public togglePower(): void {
    console.log("Toggling power on the device.");

    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  public volumneDown(): void {
    console.log("Decreasing volume on the device.");

    const volume = this.device.getVolume();
    this.device.setVolume(volume - 1);
  }

  public volumneUp(): void {
    console.log("Increasing volume on the device.");

    const volume = this.device.getVolume();
    this.device.setVolume(volume + 1);
  }

  public channelDown(): void {
    console.log("Changing channel down on the device.");

    const channel = this.device.getChannel();
    this.device.setChannel(channel - 1);
  }

  public channelUp(): void {
    console.log("Changing channel up on the device.");

    const channel = this.device.getChannel();
    this.device.setChannel(channel + 1);
  }
}

interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class TV implements Device {
  private enabled: boolean = false;
  private volume: number = 10;
  private channel: number = 1;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable(): void {
    this.enabled = true;
    console.log("TV is now enabled.");
  }

  public disable(): void {
    this.enabled = false;
    console.log("TV is now disabled.");
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    this.volume = volume;
    console.log(`TV volume set to ${this.volume}.`);
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
    console.log(`TV channel set to ${this.channel}.`);
  }
}

class Radio implements Device {
  private enabled: boolean = false;
  private volume: number = 5;
  private channel: number = 101;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable(): void {
    this.enabled = true;
    console.log("Radio is now enabled.");
  }

  public disable(): void {
    this.enabled = false;
    console.log("Radio is now disabled.");
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    this.volume = volume;
    console.log(`Radio volume set to ${this.volume}.`);
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Radio channel set to ${this.channel}.`);
  }
}

class ExtendedRemote extends Remote {
  public volumneDown(): void {
    console.log("Mute volume on the extended remote.");

    this.device.setVolume(0);
  }

  public volumneUp(): void {
    console.log("Unmute on the extended remote.");

    this.device.setVolume(100);
  }
}

function clientCode(remote: Remote) {
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
