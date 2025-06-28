abstract class Component {
  public abstract search(keyword: string): void;
}

class MyFile extends Component {
  protected name: String;

  constructor(name: String) {
    super();
    this.name = name;
  }

  public search(keyword: string): void {
    console.log(`Searching for keyword ${keyword} in file: ${this.name}`);
  }
}

class Folder extends Component {
  protected name: String;
  protected components: Component[] = [];

  constructor(name: String) {
    super();
    this.name = name;
  }

  public add(component: Component): void {
    this.components.push(component);
  }

  public search(keyword: string): void {
    console.log(`Searching for keyword ${keyword} in folder: ${this.name}`);
    for (const component of this.components) {
      component.search(keyword);
    }
  }
}

function clienCode(component: Component, keyword: string): void {
  component.search(keyword);
}

const file1 = new MyFile("File 1");

file1.search("test");

console.log("----------");

const folder1 = new Folder("Folder 1");
const folder2 = new Folder("Folder 2");
const file2 = new MyFile("File 2");
const file3 = new MyFile("File 3");

folder2.add(file3);

folder1.add(file1);
folder1.add(file2);
folder1.add(folder2);

folder1.search("test");
