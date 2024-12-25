# KIT CMD

## 功能描述点

1. input输入搜索内容
2. list根据输入的结果展示不同的数据
3. group分组显示不同的数据
4. item可以进行选择，选择后可切换显示view

## KIT CMD 结构

```tsx

<Command.Root>
  <Command.Content>
    <Command.Input />
    <Command.view />
    <Command.List>
      <Command.Empty />
      <Command.Group>
        <Command.Item />
        <Command.Separator />
        <Command.Item />
      </Command.Group>
    </Command.List>
    <Command.Footer />
  </Command.Content>
</Command.Root>

```

## KIT CMD Component API

Command(`<Command.Root>`)

```ts

interface CommandProps {

}

```

CommandContent(`<Command.Content>`)

```ts

interface CommandContentProps {
  /**
   * 当前显示的视图
   */
  view?: 'view' | 'list';
  /**
   * 视图切换的回调
   */
  onViewChange?: (view: 'view' | 'list') => void;
}

```

CommandInput(`<Command.Input>`)

```ts

interface CommandInputProps {
  // input 输入的值
  value: string;
  // input 改变触发事件
  onValueChange: (value: string) => void;
}

```

CommandView(`<Command.Content>`)

```ts

interface CommandViewProps {
  /**
   * 是否一直显示此元素
   */
  alwaysRender?: boolean;
}

```

CommandList(`<Command.List>`)

```ts

interface CommandListProps {
  /**
   * 是否一直显示此元素
   */
  alwaysRender?: boolean;
  /**
   * 是否循环选择元素
   */
  loop?: boolean;
}

```

CommandEmpty(`<Command.Empty>`)

```ts

interface CommandEmptyProps {}

```

CommandGroup(`<Command.Group>`)

```ts

interface CommandGroupProps {
  /**
   * 分组名称
   */
  heading?: React.ReactNode;
}

```

CommandItem(`<Command.Item>`)

```ts

interface CommandItemProps {
  /**
   * 是否禁止选择
   */
  disabled?: boolean;
  /**
   * 选择的值
   */
  value?: string;
  /**
   * 跳转到view使用的Key
   */
  viewKey?: string;
  /**
   * 选择当前Item事件
   */
  onSelect?: (value: string) => void;
}

```

CommandSeparator(`<Command.Separator>`)

```ts

interface CommandSeparatorProps {}

```

CommandFooter(`<Command.Footer>`)

```ts

interface CommandFooterProps {}

```
