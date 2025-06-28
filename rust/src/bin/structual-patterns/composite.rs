trait Component {
    fn search(&self, keyword: &str);
}

struct File {
    name: String
}

impl File {
    fn new(name: String) -> Self {
        File { name }
    }
}

impl Component for File {
    fn search(&self, keyword: &str) {
        println!("Searching for keyword '{}' in file: '{}'", keyword, self.name);
    }
}

struct Folder {
    name: String,
    components: Vec<Box<dyn Component>>
}

impl Folder {
    fn new(name: String) -> Self {
        Folder { name, components: Vec::new() }
    }

    fn add_component(&mut self, component: Box<dyn Component>) {
        self.components.push(component);
    }
}

impl Component for Folder {
    fn search(&self, keyword: &str) {
        println!("Searching for keyword '{}' in folder: '{}'", keyword, self.name);

        for component in self.components.iter() {
            component.search(keyword);
        }
    }
}

fn call<T: Component>(component: T, keyword: &str) {
    component.search(keyword);
}

fn main() {
    let file1 = File::new("File 1".to_string());

    call(file1, "test");

    println!("-----------");

    let mut folder1 = Folder::new("Folder 1".to_string());
    let mut folder2 = Folder::new("Folder 2".to_string());
    let file2 = File::new("File 2".to_string());
    let file3 = File::new("File 3".to_string());
    let file4 = File::new("File 4".to_string());

    folder1.add_component(Box::new(file2));
    folder1.add_component(Box::new(file3));
    folder2.add_component(Box::new(file4));

    folder1.add_component(Box::new(folder2));

    call(folder1, "test");
}