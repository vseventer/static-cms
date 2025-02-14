import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const ro: LocalePhrasesRoot = {
  auth: {
    login: 'Autentifică-te',
    loggingIn: 'Te autentificăm...',
    loginWithNetlifyIdentity: 'Autentifică-te cu Netlify Identity',
    loginWithBitbucket: 'Autentifică-te cu Bitbucket',
    loginWithGitHub: 'Autentifică-te cu GitHub',
    loginWithGitLab: 'Autentifică-te cu GitLab',
    loginWithGitea: 'Autentifică-te cu Gitea',
    errors: {
      email: 'Asigură-te că ai introdus email-ul.',
      password: 'Te rugăm introdu parola.',
      identitySettings:
        'Nu s-a putut accesa serviciul de autentificare. Dacă folosești git-gateway, asigură-te că ai activat serviciul Identity și Git-Gateway.',
    },
  },
  app: {
    header: {
      content: 'Conținut',
      workflow: 'Workflow',
      media: 'Fișiere',
      quickAdd: 'Adaugă',
    },
    app: {
      errorHeader: 'A apărut o eroare cu configurarea CMS-ului.',
      configErrors: 'Au apărut erori de configurare.',
      checkConfigYml: 'Verifică fișierul de configurare (config.yml).',
      loadingConfig: 'Se încarcă configurările...',
      waitingBackend: 'Așteptăm după backend...',
    },
    notFoundPage: {
      header: 'Pagină inexistentă.',
    },
  },
  collection: {
    sidebar: {
      collections: 'Colecții',
      allCollections: 'Toate colecțiile',
      searchAll: 'Căutare',
      searchIn: 'Caută în',
    },
    collectionTop: {
      sortBy: 'Sortează',
      viewAs: 'Vizualizează ca',
      newButton: 'Adaugă %{collectionLabel}',
      ascending: 'Ascendent',
      descending: 'Descendent',
      searchResults: 'Rezultatele căutării pentru "%{searchTerm}"',
      searchResultsInCollection: 'Rezultatele căutării pentru "%{searchTerm}" în %{collection}',
      filterBy: 'Filtrează după',
      groupBy: 'Grupează după',
    },
    entries: {
      loadingEntries: 'Se încarcă intrările...',
      cachingEntries: 'Se salvează temporar intrările...',
      longerLoading: 'Ar putea dura câteva minute.',
      noEntries: 'Nu există intrări.',
    },
    groups: {
      other: 'Altul',
      negateLabel: 'Nu %{label}',
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Actualizat la',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opțional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel}” este obligatoriu.',
        regexPattern: '%{fieldLabel} nu se potrivește după modelul: %{pattern}.',
        processing: '%{fieldLabel} se procesează.',
        range: '%{fieldLabel} poate fi între %{minValue} și %{maxValue}.',
        min: '%{fieldLabel} poate fi mai mare sau egal cu %{minValue}.',
        max: '%{fieldLabel} poate fi mai mic sau egal cu %{maxValue}.',
        rangeCount: '%{fieldLabel} poate avea între %{minCount} și %{maxCount} intrări.',
        rangeCountExact: '%{fieldLabel} trebuie să conțină exact %{count} intrări.',
        minCount: '%{fieldLabel} trebuie să conțină cel puțin %{minCount} intrări.',
        maxCount: '%{fieldLabel} trebuie să conțină cel mult %{maxCount} intrări.',
        invalidPath: `'%{path}' nu este o cale validă.`,
        pathExists: `Calea '%{path}' există deja.`,
      },
      i18n: {
        writingInLocale: 'Scrii în limba %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Ești sigur/ă că dorești să părăsești pagina?',
      onUpdatingWithUnsavedChangesBody:
        'Există modificări nesalvate! Te rugăm salvează înainte de a actualiza statusul.',
      onPublishingNotReadyBody: 'Actualizează statusul la „Gata” înainte de publicare.',
      onPublishingWithUnsavedChangesBody:
        'Există modificări nesalvate, salvează-le înainte de publicare.',
      onPublishingBody: 'Ești sigur/ă că dorești să publici acest articol?',
      onUnpublishing: 'Ești sigur/ă că dorești să anulezi publicarea acestui articol?',
      onDeleteWithUnsavedChangesBody:
        'Ești sigur/ă că dorești să ștergi această publicare, dar și modificările nesalvate din sesiunea curentă?',
      onDeletePublishedEntryBody: 'Ești sigur/ă că dorești să ștergi această publicare?',
      loadingEntry: 'Se încarcă...',
      confirmLoadBackupBody:
        'Un backup local a fost recuperat pentru această intrare, dorești să îl folosești?',
    },
    editorInterface: {
      toggleI18n: 'Comută limba',
      togglePreview: 'Comută previzualizarea',
      toggleScrollSync: 'Sincronizează scroll-ul',
    },
    editorToolbar: {
      publishing: 'Se publică...',
      publish: 'Publicare',
      published: 'Publicat',
      unpublish: 'Anulează publicarea',
      duplicate: 'Duplifică',
      unpublishing: 'Se anulează publicarea...',
      publishAndCreateNew: 'Publicare apoi crează altul',
      publishAndDuplicate: 'Publicare apoi duplifică',
      deleteEntry: 'Șterge intrare',
      saving: 'Se salvează...',
      save: 'Salvează',
      deleting: 'Se șterge...',
      updating: 'Se actualizează...',
      status: 'Status: %{status}',
      backCollection: ' Scrii în colecția „%{collectionLabel}”',
      unsavedChanges: 'Modificări nesalvate',
      changesSaved: 'Modificări salvate',
      draft: 'Ciornă',
      inReview: 'În revizuire',
      ready: 'Gata',
      publishNow: 'Publicare',
      deployPreviewPendingButtonLabel: 'Verifică publicare',
      deployPreviewButtonLabel: 'Previzualizare',
      deployButtonLabel: 'Vezi publicarea',
    },
    editorWidgets: {
      markdown: {
        bold: 'Bold',
        italic: 'Italic',
        code: 'Cod sursă',
        link: 'Link',
        linkPrompt: 'Scrie URL-ul',
        headings: 'Titluri',
        quote: 'Citat',
        bulletedList: 'Listă cu puncte',
        numberedList: 'Listă cu numere',
        addComponent: 'Adaugă componentă',
        richText: 'Rich Text',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Alege o imagine',
        chooseUrl: 'Inserează din URL',
        replaceUrl: 'Schimbă cu URL',
        promptUrl: 'Introdu URL-ul imaginii',
        chooseDifferent: 'Alege altă imagine',
        remove: 'Șterge imaginea',
      },
      file: {
        choose: 'Alege un fișier',
        chooseUrl: 'Inserează din URL',
        replaceUrl: 'Schimbă cu URL',
        promptUrl: 'Introdu URL-ul fișierului',
        chooseDifferent: 'Alege alt fișier',
        remove: 'Șterge fișier',
      },
      unknownControl: {
        noControl: 'Widget-ul „%{widget}” nu are configurări valabile.',
      },
      unknownPreview: {
        noPreview: 'Nu există previzualizare pentru widget-ul „%{widget}”.',
      },
      headingOptions: {
        headingOne: 'Titlu 1',
        headingTwo: 'Titlu 2',
        headingThree: 'Titlu 3',
        headingFour: 'Titlu 4',
        headingFive: 'Titlu 5',
        headingSix: 'Titlu 6',
      },
      datetime: {
        now: 'Acum',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Ciornă',
      copy: 'Copiază',
      copyUrl: 'Copiază URL',
      copyPath: 'Copiază cale',
      copyName: 'Copiaza nume',
      copied: 'Copiat',
    },
    mediaLibrary: {
      onDeleteBody: 'Ești sigur/ă că dorești să ștergi fișierul selectat?',
      fileTooLargeBody:
        'Fișier prea mare.\nConfigurarea nu permite fișiere mai mari de %{size} KB.',
    },
    mediaLibraryModal: {
      loading: 'Se încarcă...',
      noResults: 'Nu sunt rezultate.',
      noAssetsFound: 'Nu s-au găsit fișiere.',
      noImagesFound: 'Nu s-au găsit imagini.',
      images: 'Imagini',
      mediaAssets: 'Fișiere media',
      search: 'Caută...',
      uploading: 'Se încarcă...',
      upload: 'Încarcă',
      download: 'Descarcă',
      deleting: 'Se șterge...',
      deleteSelected: 'Șterge fișierele selectate',
      chooseSelected: 'Alege fișierele selectate',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Înapoi la site',
    },
    errorBoundary: {
      title: 'Eroare',
      details: 'A apărut o eroare - te rugăm ',
      reportIt: 'Deschide o problemă pe GitHub.',
      detailsHeading: 'Detalii',
      privacyWarning:
        'Problema deschisă va fi precompletată cu mesajul de eroare și datele de depanare.\nTe rugăm verifică datele să fie corecte și șterge orice fel de date personale.',
      recoveredEntry: {
        heading: 'Document recuperat',
        warning: 'Te rugăm să faci copy/paste la datele acestea undeva înainte de ieșire!',
        copyButtonLabel: 'Copiază în clipboard',
      },
    },
    settingsDropdown: {
      logOut: 'Ieșire din cont',
    },
    toast: {
      onFailToLoadEntries: 'A eșuat încărcarea intrării: %{details}',
      onFailToLoadDeployPreview: 'A eșuat încărcarea previzualizării: %{details}',
      onFailToPersist: 'A eșuat persistarea intrării: %{details}',
      onFailToDelete: 'A eșuat ștergerea intrării: %{details}',
      onFailToUpdateStatus: 'A eșuat actualizarea status-ului: %{details}',
      missingRequiredField: 'Oops, ai ratat un câmp obligatoriu. Completează-l pentru a salva.',
      entrySaved: 'Intrare salvată',
      entryPublished: 'Intrare publicată',
      onFailToPublishEntry: 'A eșuat publicarea: %{details}',
      entryUpdated: 'S-a actualizat status-ul intrării',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Ai fost delogat, te rugăm salvează orice date și autentifică-te din nou.',
      onBackendDown: 'Există probleme la server. Vezi %{details} pentru mai multe informații.',
    },
  },
  workflow: {
    workflow: {
      loading: 'Se încarcă intrările din Workflow-ul Editorial',
      workflowHeading: 'Workflow Editorial',
      newPost: 'Postare nouă',
      description:
        '%{smart_count} pregătite de revizuire, %{readyCount} gata de publicare. |||| %{smart_count} pregătite de revizuire, %{readyCount} gata de publicare. ',
      dateFormat: 'MMMM D',
    },
    workflowCard: {
      lastChange: '%{date} de %{author}',
      lastChangeNoAuthor: '%{date}',
      lastChangeNoDate: 'de %{author}',
      deleteChanges: 'Modificări șterse',
      deleteNewEntry: 'Șterge intrarea nouă',
      publishChanges: 'Publicare modificări',
      publishNewEntry: 'Publicare intrare nouă',
    },
    workflowList: {
      onDeleteEntry: 'Ești sigur/ă că dorești ștergerea intrării?',
      onPublishingNotReadyEntry:
        'Numai intrări cu status-ul „Gata” pot fi publicate. Trage un card în coloana „Gata” pentru a putea publica.',
      onPublishEntry: 'Ești sigur/ă că dorești să faci publicarea?',
      draftHeader: 'Ciorne',
      inReviewHeader: 'În revizuire',
      readyHeader: 'Gata',
      currentEntries: '%{smart_count} intrări |||| %{smart_count} intrări',
    },
  },
};

export default ro;
