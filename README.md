# KeePassXC.org

Website sources for https://keepassxc.org.

## Prerequisites

This website uses [Hugo](https://gohugo.io/). To build the sources, you need to install it first.

Linux:
```bash
sudo snap install hugo
```

macOS:
```bash
brew install hugo
```

Windows:
```bash
winget install Hugo.Hugo.Extended
```

## Build website

- Install NPM dependencies: `npm install`
- Run Hugo dev server: `hugo serve`

## Create a new blog post

To create a new blog post, run

```bash
hugo new blog/202X-XX-XX-blog-post-name.md
```

This will create a new file `blog/202x-XX-XX-blog-post-name.md` from the `blog` archetype with some pre-filled frontmatter fields.
