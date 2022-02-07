import daybookRouter from "@/modules/daybook/router";

describe("daybook router", () => {
  test("should has the good configuration", () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
  });

  // this is not flesible
  test('should render the NoEntrySelected component in the first route', async () => {
      const component = await daybookRouter.children[0].component()
      expect(component.default.name).toBe('NoEntrySelected')
  });

  test('should render the EntryView component in the first route', async () => {
      const component = await daybookRouter.children[1].component()
      expect(component.default.name).toBe('EntryView')
  });
  // end comment

  test('should render the correct components (Mapping)', async () => {
      const promisesRoutes = []
      daybookRouter.children.forEach(child => promisesRoutes.push(child.component()))
      const routes = (await Promise.all(promisesRoutes)).map(child => child.default.name)
      // It doesn't matter the order
      expect(routes).toContain('EntryView')
      expect(routes).toContain('NoEntrySelected')
  });
});
