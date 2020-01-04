# How to release

1. Create release branch

    ```
    $ git flow release start x.y.z
    ```

2. Bump version in `pegmatite/manifest.json` and `package.json`
3. Commit and finish release

    ```
    $ git commit -m "bump version"
    $ git flow release finish x.y.z
    $ git push origin master develop --tags
    ```

4. Create package

    ```
    $ zip -r pegmatite.zip -j pegmatite/*
    ```

5. Open developer dashboard

    ```
    $ open https://chrome.google.com/webstore/developer/edit/jegkfbnfbfnohncpcfcimepibmhlkldo
    ```

6. Upload package
7. Preview and publish
