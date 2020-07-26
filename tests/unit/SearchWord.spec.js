import { shallowMount } from "@vue/test-utils";
import SearchWord from "@/components/SearchWord";

describe("SearchWord", () => {
  let wrapper;
  function getMountedComponent(Component, propsData) {
    return shallowMount(Component, {
      propsData
    });
  }

  beforeEach(() => {
    wrapper = getMountedComponent(SearchWord, {
      content: "Hello"
    });
    if (!RegExp.escape) {
      RegExp.escape = function(s) {
        return String(s).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
      };
    }
  });

  it("renders the correct message", () => {
    expect(wrapper.vm._props.content).toMatch("Hello");
  });

  it("sets the correct default data", () => {
    expect(typeof SearchWord.data).toEqual("function");
    const defaultData = SearchWord.data();
    expect(defaultData.wholeWord).toBeTruthy();
    expect(defaultData.caseSensitive).toBeTruthy();
    expect(defaultData.query).toMatch("");
    expect(defaultData.count).toEqual(0);
    expect(defaultData.highlightText).toEqual([]);
  });

  it("has a created hook", () => {
    expect(typeof SearchWord.created).toBe("function");
  });

  it("correctly sets the message when created", () => {
    expect(wrapper.vm.$data.highlightText[0].val).toBe("Hello");
  });

  it("Whole word, case sensitive match", () => {
    wrapper.vm.query = "hello";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(0);

    wrapper.vm.query = "Hello";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(1);
  });
  it("Whole word, case insensitive match", () => {
    wrapper.vm.caseSensitive = false;

    wrapper.vm.query = "hel";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(0);

    wrapper.vm.query = "hello";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(1);

    wrapper.vm.query = "Hello";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(1);
  });

  it("No word restriction, case insensitive match", () => {
    wrapper.vm.caseSensitive = false;
    wrapper.vm.wholeWord = false;

    wrapper.vm.query = "el";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(1);

    wrapper.vm.query = "l";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(2);

    wrapper.vm.query = "Hello";
    wrapper.vm.queryUpdated();
    expect(wrapper.vm.count).toEqual(1);
  });
});
