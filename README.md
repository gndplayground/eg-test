# Bài test dàn layout

[Xem online](https://eg-giang.netlify.app/)

## Phát triển

```
npm i
```

Chạy dev

```
npm run dev
```

Build production

```
npm run build
```

## Code quality

- Ensured the code quality with `eslint`, `style-lint`
- Formated the code with `prettier`
- Commit lint `commit-lint`
- All the process automatically when commit the code by `husky`, `lint-staged`

Although some developers might trick the process by bypass the commit hook. In the real project, we should protect the important branches (prevent merge directly) and setup CI to check the code quality before merge request.
