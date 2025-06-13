# Planhat Component Library

This project is a modern Vue 3 component library and chat simulation, inspired by shadcn/ui and built with best practices for reusability, accessibility, and composability.

## Philosophy

The component library follows a "base-first" approach, where base components are designed to be as close to standard HTML elements as possible while providing consistent styling, accessibility, and composability. This makes them ideal building blocks for more complex components.

## Features

- **Base Components**: Minimal, accessible UI components that serve as building blocks:

  - `BaseButton`: Flexible button component with variants, sizes, and full slot support
  - `BaseBadge`: Versatile badge component with multiple variants and asChild support
  - `BaseTextArea`: Controlled textarea with class merging and accessibility support
  - `BaseAvatar`: Avatar component with image and fallback support

- **Comment System**:
  - `CommentCard`: Displays a user comment with avatar, author, date, and text
  - `CommentTextArea`: Reusable textarea for input with action buttons
  - **Chat Simulation**: Uses Pinia for state management with real-time message updates

## Component Usage Examples

### BaseButton

```vue
<!-- Default button -->
<BaseButton>Click me</BaseButton>

<!-- With variants and sizes -->
<BaseButton variant="outline" size="sm">Small Outline</BaseButton>
<BaseButton variant="destructive" size="lg">Large Delete</BaseButton>

<!-- With icons -->
<BaseButton>
  <SendHorizontal :size="16" />
  Send Message
</BaseButton>
```

### BaseBadge

```vue
<!-- Default badge -->
<BaseBadge>New</BaseBadge>

<!-- With variants -->
<BaseBadge variant="outline">Draft</BaseBadge>
<BaseBadge variant="secondary">In Progress</BaseBadge>

<!-- As child element -->
<BaseBadge asChild>
  <a href="/link">Link Badge</a>
</BaseBadge>
```

### BaseTextArea

```vue
<!-- Basic usage -->
<BaseTextArea v-model="text" placeholder="Enter text..." />

<!-- With custom styling -->
<BaseTextArea v-model="text" class="bg-gray-50 dark:bg-gray-800" :rows="4" />
```

## Folder Structure

```
src/
  components/
    base/           # Base components
      BaseButton.vue
      BaseBadge.vue
      BaseTextArea.vue
      BaseAvatar.vue
    CommentCard.vue
    CommentTextArea.vue
  stores/
    messages.ts
  utils/
    seed.ts
  assets/
    avatars/
      memo_1.png ... memo_9.png
```

## Accessibility

- All components follow accessibility best practices
- ARIA labels and roles are applied for screen reader support
- Keyboard navigation support (tabindex, focus management)
- Color contrast compliance in both light and dark modes

## Testing

- Unit tests for all base components in `tests/unit/`
- Run tests with `bin test:unit` or `vitest`

## Development

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

### Project Setup

```sh
bun install
```

### Development

```sh
bun dev
```

### Build

```sh
bun run build
```

### Testing

```sh
bun test:unit
```

### Linting

```sh
bun lint
```

## TypeScript Support

TypeScript support is enabled for `.vue` files using `vue-tsc`. For editor support, use [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

---

**This project demonstrates a modern, accessible, and composable approach to building Vue 3 UI primitives and a chat interface.**
