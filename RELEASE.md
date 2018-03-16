# How to release

1. Create release branch

    ```
    $ git flow release start x.y.z
    ```

2. Bump version in `pegmatite/manifest.json`
3. Commit and finish release

    ```
    $ git commit -m"bump version"
    $ git flow release finish x.y.z
    ```

1. Create package

    ```
    $ zip -r pegmatite.zip -j pegmatite/*
    ```

2. Open developer dashboard

    ```
    $ open https://chrome.google.com/webstore/developer/edit/jegkfbnfbfnohncpcfcimepibmhlkldo
    ```

3. Upload package
4. Preview and publish
