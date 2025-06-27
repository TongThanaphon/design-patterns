trait Device {
    fn is_enabled(&self) -> bool;
    fn enable(&mut self);
    fn disable(&mut self);
    fn get_volumne(&self) -> u8;
    fn set_volumne(&mut self, volume: u8);
    fn get_channel(&self) -> u16;
    fn set_channel(&mut self, channel: u16);
}

trait HasMutableDevice<T: Device> {
    fn device(&mut self) -> &mut T;
}

trait RemoteControl<T: Device>: HasMutableDevice<T> {
    fn toggle_power(&mut self) {
        println!("Toggling power on the device");
        if self.device().is_enabled() {
            self.device().disable();
        } else {
            self.device().enable();
        }
    }

    fn volumne_up(&mut self) {
        println!("Increasing volume on the device");
        let volume = self.device().get_volumne();
        self.device().set_volumne(volume + 1);
    }

    fn volumne_down(&mut self) {
        println!("Decreasing volume on the device");
        let volume = self.device().get_volumne();
        self.device().set_volumne(volume.saturating_sub(1));
    }

    fn channel_up(&mut self) {
        println!("Changing channel up on the device");
        let channel = self.device().get_channel();
        self.device().set_channel(channel + 1);
    }

    fn channel_down(&mut self) {
        println!("Changing channel down on the device");
        let channel = self.device().get_channel();
        self.device().set_channel(channel.saturating_sub(1));
    }
}

struct Remote<T: Device> {
    device: T,
}

impl <T: Device>Remote<T> {
    fn new(device: T) -> Self {
        Self { device }
    }
}

impl <T: Device> HasMutableDevice<T> for Remote<T> {
    fn device(&mut self) -> &mut T {
        &mut self.device
    }
}

impl <T: Device>RemoteControl<T> for Remote<T> {}

#[derive(Clone)]
struct TV {
    enabled: bool,
    volume: u8,
    channel: u16,
}

impl TV {
    fn new() -> Self {
        Self {
            enabled: false,
            volume: 10,
            channel: 1,
        }
    }
}

impl Device for TV {
    fn is_enabled(&self) -> bool {
        self.enabled
    }

    fn enable(&mut self) {
        self.enabled = true;
    }

    fn disable(&mut self) {
        self.enabled = false;
    }

    fn get_volumne(&self) -> u8 {
        self.volume as u8
    }

    fn set_volumne(&mut self, volume: u8) {
        self.volume = volume as u8;
        println!("TV volume set to {}", self.volume);
    }

    fn get_channel(&self) -> u16 {
        self.channel as u16
    }

    fn set_channel(&mut self, channel: u16) {
        self.channel = channel as u16;
        println!("TV channel set to {}", self.channel);
    }
}

struct Radio {
    enabled: bool,
    volume: u8,
    station: u16,
}

impl Radio {
    fn new() -> Self {
        Self {
            enabled: false,
            volume: 10,
            station: 101,
        }
    }
}

impl Device for Radio {
    fn is_enabled(&self) -> bool {
        self.enabled
    }

    fn enable(&mut self) {
        self.enabled = true;
    }

    fn disable(&mut self) {
        self.enabled = false;
    }

    fn get_volumne(&self) -> u8 {
        self.volume as u8
    }

    fn set_volumne(&mut self, volume: u8) {
        self.volume = volume as u8;
        println!("Radio volume set to {}", self.volume);
    }

    fn get_channel(&self) -> u16 {
        self.station as u16
    }

    fn set_channel(&mut self, channel: u16) {
        self.station = channel as u16;
        println!("Radio station set to {:.1}", self.station);
    }
}

struct ExtendedRemote<T: Device> {
    device: T
}

impl <T: Device> ExtendedRemote<T> {
    fn new(device: T) -> Self {
        Self { device }
    }
}

impl <T: Device>HasMutableDevice<T> for ExtendedRemote<T> {
    fn device(&mut self) -> &mut T {
        &mut self.device
    }
}

impl <T: Device> RemoteControl<T> for ExtendedRemote<T> {
    fn volumne_up(&mut self) {
        println!("Extended remote unmute volume on the device");
        self.device().set_volumne(100);
    }

    fn volumne_down(&mut self) {
        println!("Extended remote mute volume on the device");
        self.device().set_volumne(0);
    }
}

fn call<T: Device>(remote: &mut impl RemoteControl<T>) {
    remote.toggle_power();
    remote.volumne_up();
    remote.channel_up();
    remote.volumne_down();
    remote.channel_down();
    remote.toggle_power();
}

fn main() {
    let tv = TV::new();
    let mut tv_remote = Remote::new(tv.clone());
    call(&mut tv_remote);

    println!("\n---\n");

    let radio = Radio::new();
    let mut radio_remote = Remote::new(radio);
    call(&mut radio_remote);

    println!("\n---\n");
    let mut extended_remote = ExtendedRemote::new(tv);
    call(&mut extended_remote)
}