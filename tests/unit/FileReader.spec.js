import { shallowMount } from "@vue/test-utils";
import FileReader from "@/components/FileReader";

describe("FileReader", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FileReader);
  });

  it("renders the correct message", () => {
    expect(wrapper.text()).toMatch("Read File  Please select a Text File!");
  });

  it("sets the correct default data", () => {
    expect(typeof FileReader.data).toEqual("function");
    const defaultData = FileReader.data();
    expect(defaultData.showSnackbar).toBeFalsy();
  });

  it("loads file content", () => {
    const mFile = new File(["test content"], "testFile.txt", {
      type: "text/plain"
    });
    const readAsText = jest.spyOn(window.FileReader.prototype, "readAsText");
    wrapper.vm.loadTextFromFile([mFile]);
    expect(readAsText).toBeCalled();
    setTimeout(() => {
      expect(wrapper.emitted().load).toMatch("test content");
    }, 1000);
  });

  it("does not load file", () => {
    const mFile = new File(["test content"], "testFile.pdf", {
      type: "application/pdf"
    });
    wrapper.vm.$refs.mdfile.clearField = () => {};
    wrapper.vm.loadTextFromFile([mFile]);
    expect(wrapper.vm.showSnackbar).toBeTruthy();
    setTimeout(() => {
      expect(wrapper.emitted().load).toMatch("");
    }, 10);
  });
});
