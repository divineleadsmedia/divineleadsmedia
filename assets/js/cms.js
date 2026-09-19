/**
 * DivineLeads Media - Modern CMS Admin Dashboard & Editorial Suite
 * High-class, lightweight, reactive WordPress/Ghost-style article room
 * with tag pills manager, featured cover image studio, and real-time live preview.
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = window.DLM_DB.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  // Populate User Info
  document.getElementById('cmsUserAvatar').textContent = currentUser.avatar || 'DL';
  document.getElementById('cmsUserName').textContent = currentUser.fullName || 'Admin User';
  document.getElementById('cmsUserRole').textContent = currentUser.role || 'Administrator';

  // Setup Logout
  document.getElementById('cmsLogoutBtn').addEventListener('click', () => {
    window.DLM_DB.logout();
    window.location.href = 'login.html';
  });

  // Setup Navigation Tabs
  setupNavigation();

  // Initial Load
  updateOverviewStats();
  renderCmsArticlesTable();
  renderCmsNewsTable();
  renderCmsDownloadsTable();
  renderCmsWebinarsTable();

  // Setup Studio Rooms & Forms
  setupArticleStudio();
  setupNewsStudio();
  setupDownloadForm();
  setupWebinarForm();
  setupBackupHandlers();

  // Listen for DB changes
  window.addEventListener('dlm_db_articles_changed', () => {
    renderCmsArticlesTable();
    updateOverviewStats();
  });

  window.addEventListener('dlm_db_news_changed', () => {
    renderCmsNewsTable();
    updateOverviewStats();
  });
});

// ==================== NAVIGATION CONTROLLER ====================
function setupNavigation() {
  const navBtns = document.querySelectorAll('.cms-nav-btn[data-tab]');
  const views = document.querySelectorAll('.cms-view');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchToView(tabId);
    });
  });
}

function switchToView(tabId) {
  const navBtns = document.querySelectorAll('.cms-nav-btn[data-tab]');
  const views = document.querySelectorAll('.cms-view');

  navBtns.forEach(b => {
    if (b.getAttribute('data-tab') === tabId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  views.forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });

  const targetView = document.getElementById('view-' + tabId);
  if (targetView) {
    targetView.style.display = 'block';
    targetView.classList.add('active');
  }

  // Refresh tab data
  if (tabId === 'overview') updateOverviewStats();
  if (tabId === 'articles') renderCmsArticlesTable();
  if (tabId === 'news') renderCmsNewsTable();
  if (tabId === 'downloads') renderCmsDownloadsTable();
  if (tabId === 'webinars') renderCmsWebinarsTable();
}

function updateOverviewStats() {
  const news = window.DLM_DB.getNews();
  const articles = window.DLM_DB.getArticles();
  const downloads = window.DLM_DB.getDownloads();
  const webinars = window.DLM_DB.getWebinars();

  document.getElementById('statTotalNews').textContent = news.length;
  document.getElementById('statTotalArticles').textContent = articles.length;
  document.getElementById('statTotalDownloads').textContent = downloads.length;
  document.getElementById('statTotalWebinars').textContent = webinars.length;

  const navArt = document.getElementById('navCountArticles');
  if (navArt) navArt.textContent = articles.length;
  const navNews = document.getElementById('navCountNews');
  if (navNews) navNews.textContent = news.length;
}

// ==================== ARTICLES DASHBOARD & ALL POSTS ====================
let articleStatusFilter = 'all';
let articleSearchQuery = '';

function renderCmsArticlesTable() {
  const tbody = document.getElementById('cmsArticlesTableBody');
  if (!tbody) return;

  const articles = window.DLM_DB.getArticles();
  
  // Count by status
  const publishedCount = articles.filter(a => (a.status || 'published') === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;

  const countAllEl = document.getElementById('countArtAll');
  const countPubEl = document.getElementById('countArtPublished');
  const countDraftEl = document.getElementById('countArtDraft');
  if (countAllEl) countAllEl.textContent = articles.length;
  if (countPubEl) countPubEl.textContent = publishedCount;
  if (countDraftEl) countDraftEl.textContent = draftCount;

  // Filter
  let filtered = articles;
  if (articleStatusFilter === 'published') {
    filtered = filtered.filter(a => (a.status || 'published') === 'published');
  } else if (articleStatusFilter === 'draft') {
    filtered = filtered.filter(a => a.status === 'draft');
  }

  if (articleSearchQuery.trim() !== '') {
    const q = articleSearchQuery.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) ||
      (a.summary && a.summary.toLowerCase().includes(q)) ||
      (a.author && a.author.toLowerCase().includes(q)) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
      (a.tag && a.tag.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-dim);">No articles found matching this view.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(art => {
    const tags = Array.isArray(art.tags) && art.tags.length > 0 ? art.tags : [art.tag || 'Education Tech'];
    const status = art.status === 'draft' ? 'draft' : 'published';
    const statusLabel = status === 'draft' ? '✎ Draft' : '✓ Published';
    const coverImg = art.cover || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80';

    return `
      <tr>
        <td>
          <div class="table-post-cell">
            <img src="${coverImg}" alt="${art.title}" class="table-post-thumb" onerror="this.src='https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80'">
            <div class="table-post-info">
              <span class="table-post-title">${art.title}</span>
              <span class="table-post-meta">
                <span>By ${art.author}</span>
                <span>·</span>
                <span>${art.readTime || '4 min read'}</span>
              </span>
            </div>
          </div>
        </td>
        <td>
          <div class="tag-pills-wrap">
            <span class="tag-chip-sm" style="background:rgba(37,99,235,0.2); font-weight:600;">${art.tag || tags[0]}</span>
            ${tags.slice(1, 4).map(t => `<span class="tag-chip-sm">#${t}</span>`).join('')}
            ${tags.length > 4 ? `<span class="tag-chip-sm" title="${tags.slice(4).join(', ')}">+${tags.length - 4}</span>` : ''}
          </div>
        </td>
        <td style="white-space:nowrap; font-size:0.84rem; color:var(--text-muted);">${art.author}</td>
        <td style="white-space:nowrap; font-size:0.84rem; color:var(--text-dim);">${art.date}</td>
        <td>
          <span class="status-pill ${status}">${statusLabel}</span>
        </td>
        <td style="white-space:nowrap;">
          <button class="btn btn-secondary btn-sm" onclick="openArticleStudio('${art.id}')">Edit in Room</button>
          <button class="btn btn-sm" style="background:rgba(239,68,68,0.2); border:1px solid #EF4444; color:#EF4444; margin-left:4px;" onclick="deleteArticleItem('${art.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Status filter tabs for articles
document.getElementById('articleStatusFilterTabs')?.querySelectorAll('.cms-filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#articleStatusFilterTabs .cms-filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    articleStatusFilter = btn.getAttribute('data-filter');
    renderCmsArticlesTable();
  });
});

// Search input for articles
document.getElementById('articlesSearchInput')?.addEventListener('input', (e) => {
  articleSearchQuery = e.target.value;
  renderCmsArticlesTable();
});

window.deleteArticleItem = function(id) {
  if (confirm('Are you sure you want to permanently delete this research article?')) {
    window.DLM_DB.deleteArticle(id);
    window.showToast('Article deleted.', 'success');
    renderCmsArticlesTable();
    updateOverviewStats();
  }
};

// ==================== ARTICLE ROOM STUDIO LOGIC ====================
let currentArticleTags = [];
let currentArticleStatus = 'published';

function setupArticleStudio() {
  // New Article button from dashboard
  document.getElementById('btnAddNewArticle')?.addEventListener('click', () => {
    openArticleStudio();
  });

  // Back button
  document.getElementById('btnBackToArticles')?.addEventListener('click', () => {
    switchToView('articles');
  });

  // Title sync
  const titleInput = document.getElementById('artStudioTitle');
  titleInput?.addEventListener('input', (e) => {
    const title = e.target.value.trim() || 'Untitled Guide';
    document.getElementById('artStudioDocTitle').textContent = title;
    document.getElementById('artSeoPreviewTitle').textContent = title;
  });

  // Content auto-calculators
  const contentInput = document.getElementById('artStudioContent');
  contentInput?.addEventListener('input', () => {
    updateArticleWordCount();
  });

  // Summary sync
  const summaryInput = document.getElementById('artStudioSummary');
  summaryInput?.addEventListener('input', (e) => {
    document.getElementById('artSeoPreviewDesc').textContent = e.target.value.trim() || 'Brief summary of what this guide teaches...';
  });

  // Auto-generate summary
  document.getElementById('btnAutoGenerateArtSummary')?.addEventListener('click', () => {
    const content = contentInput.value.trim();
    if (!content) return;
    const firstPara = content.split('\n\n')[0].replace(/[#*`_>]/g, '').trim();
    const excerpt = firstPara.length > 200 ? firstPara.slice(0, 197) + '...' : firstPara;
    summaryInput.value = excerpt;
    document.getElementById('artSeoPreviewDesc').textContent = excerpt;
    window.showToast('Excerpt generated from content!', 'success');
  });

  // Status toggle buttons
  const pubBtn = document.getElementById('artStatusBtnPublished');
  const draftBtn = document.getElementById('artStatusBtnDraft');
  
  pubBtn?.addEventListener('click', () => {
    setArticleStatusState('published');
  });
  draftBtn?.addEventListener('click', () => {
    setArticleStatusState('draft');
  });

  // Date "Now" button
  document.getElementById('btnArtDateToday')?.addEventListener('click', () => {
    document.getElementById('artStudioDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });

  // Featured Image: URL input sync
  const coverInput = document.getElementById('artStudioCover');
  coverInput?.addEventListener('input', (e) => {
    updateArticleCoverPreview(e.target.value.trim());
  });

  // Featured Image: Local File Upload
  const fileInput = document.getElementById('artStudioCoverFileInput');
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      coverInput.value = dataUrl;
      updateArticleCoverPreview(dataUrl);
      window.showToast('Local image loaded!', 'success');
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  // Featured Image: Replace & Remove
  document.getElementById('btnArtChangeImg')?.addEventListener('click', () => {
    fileInput?.click();
  });

  document.getElementById('btnArtRemoveImg')?.addEventListener('click', () => {
    coverInput.value = '';
    updateArticleCoverPreview('');
  });

  // Featured Image: Curated Presets
  document.querySelectorAll('#artCoverPresets .image-preset-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const url = thumb.getAttribute('data-url');
      if (url) {
        coverInput.value = url;
        updateArticleCoverPreview(url);
        window.showToast('Preset visual applied!', 'success');
      }
    });
  });

  // Tags: Input handling (Enter or comma)
  const tagInput = document.getElementById('artTagInputField');
  tagInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.value.trim().replace(/^#/, '');
      if (val) {
        addArticleTag(val);
        tagInput.value = '';
      }
    }
  });

  // Tags: Suggested tags cloud
  document.querySelectorAll('#artSuggestedTagsCloud .suggested-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      if (tag) addArticleTag(tag);
    });
  });

  // Formatting Toolbar Buttons
  setupEditorialToolbar('artStudioContent', 'artStudioLivePreview', 'btnToggleArtPreview', 'toolbar-btn');

  // Inspector Toggle
  document.getElementById('btnToggleArtInspector')?.addEventListener('click', () => {
    document.getElementById('artStudioGrid')?.classList.toggle('inspector-collapsed');
  });

  // Action: Save Draft
  document.getElementById('btnArtSaveDraft')?.addEventListener('click', () => {
    saveArticleFromStudio('draft');
  });

  // Action: Publish Guide
  document.getElementById('btnArtPublish')?.addEventListener('click', () => {
    saveArticleFromStudio('published');
  });
}

function setArticleStatusState(status) {
  currentArticleStatus = status;
  const pubBtn = document.getElementById('artStatusBtnPublished');
  const draftBtn = document.getElementById('artStatusBtnDraft');
  const badge = document.getElementById('artStudioStatusBadge');

  if (status === 'published') {
    pubBtn.classList.add('active', 'published');
    draftBtn.classList.remove('active', 'draft');
    if (badge) {
      badge.className = 'status-pill published';
      badge.textContent = '● Published';
    }
  } else {
    draftBtn.classList.add('active', 'draft');
    pubBtn.classList.remove('active', 'published');
    if (badge) {
      badge.className = 'status-pill draft';
      badge.textContent = '✎ Draft';
    }
  }
}

function updateArticleCoverPreview(url) {
  const frame = document.getElementById('artCoverPreviewFrame');
  const img = document.getElementById('artCoverPreviewImg');
  const empty = document.getElementById('artCoverEmptyState');

  if (url) {
    img.src = url;
    img.style.display = 'block';
    empty.style.display = 'none';
    frame.classList.add('has-image');
  } else {
    img.src = '';
    img.style.display = 'none';
    empty.style.display = 'flex';
    frame.classList.remove('has-image');
  }
}

function renderArticleTagChips() {
  const container = document.getElementById('artTagsChipsContainer');
  const countBadge = document.getElementById('artTagsCountBadge');
  if (!container) return;

  if (countBadge) countBadge.textContent = `${currentArticleTags.length} tag${currentArticleTags.length === 1 ? '' : 's'}`;

  if (currentArticleTags.length === 0) {
    container.innerHTML = `<span style="font-size:0.75rem; color:var(--text-dim);">No tags added yet.</span>`;
    return;
  }

  container.innerHTML = currentArticleTags.map((tag, idx) => `
    <span class="tag-chip-item">
      <span>#${tag}</span>
      <button type="button" class="tag-chip-remove" onclick="removeArticleTag(${idx})" title="Remove tag">×</button>
    </span>
  `).join('');
}

function addArticleTag(tag) {
  const clean = tag.trim().replace(/^#/, '');
  if (!clean) return;
  if (!currentArticleTags.some(t => t.toLowerCase() === clean.toLowerCase())) {
    currentArticleTags.push(clean);
    renderArticleTagChips();
  }
}

window.removeArticleTag = function(idx) {
  currentArticleTags.splice(idx, 1);
  renderArticleTagChips();
};

function updateArticleWordCount() {
  const content = document.getElementById('artStudioContent').value.trim();
  const words = content ? content.split(/\s+/).filter(Boolean).length : 0;
  const readMins = Math.max(1, Math.ceil(words / 180));
  const readTimeStr = `${readMins} min read`;

  const wordBadge = document.getElementById('artStudioWordCount');
  if (wordBadge) wordBadge.textContent = `${words} words · ${readTimeStr}`;

  const readTimeInput = document.getElementById('artStudioReadTime');
  if (readTimeInput && !readTimeInput.dataset.manual) {
    readTimeInput.value = readTimeStr;
  }
}

window.openArticleStudio = function(id = null) {
  const views = document.querySelectorAll('.cms-view');
  views.forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });

  const studio = document.getElementById('view-article-editor');
  studio.style.display = 'block';
  studio.classList.add('active');

  const currentUser = window.DLM_DB.getCurrentUser();

  if (id) {
    const art = window.DLM_DB.getArticleById(id);
    if (!art) return;

    document.getElementById('artStudioId').value = art.id;
    document.getElementById('artStudioTitle').value = art.title;
    document.getElementById('artStudioDocTitle').textContent = art.title;
    document.getElementById('artStudioCategory').value = art.tag || 'Software & AI';
    document.getElementById('artStudioDate').value = art.date;
    document.getElementById('artStudioAuthor').value = art.author;
    document.getElementById('artStudioRole').value = art.role || '';
    document.getElementById('artStudioReadTime').value = art.readTime || '4 min read';
    document.getElementById('artStudioCover').value = art.cover || '';
    document.getElementById('artStudioCoverAlt').value = art.coverAlt || art.title;
    document.getElementById('artStudioSummary').value = art.summary || '';
    document.getElementById('artStudioContent').value = art.content || '';

    currentArticleTags = Array.isArray(art.tags) && art.tags.length > 0 ? [...art.tags] : [art.tag || 'Education Tech'];
    setArticleStatusState(art.status === 'draft' ? 'draft' : 'published');
    updateArticleCoverPreview(art.cover);

    document.getElementById('artSeoPreviewTitle').textContent = art.title;
    document.getElementById('artSeoPreviewDesc').textContent = art.summary || 'Brief summary of what this guide teaches...';
  } else {
    // New Article
    document.getElementById('artStudioId').value = '';
    document.getElementById('artStudioTitle').value = '';
    document.getElementById('artStudioDocTitle').textContent = 'Untitled Guide';
    document.getElementById('artStudioCategory').value = 'Software & AI';
    document.getElementById('artStudioDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('artStudioAuthor').value = currentUser ? currentUser.fullName : 'DLM Team';
    document.getElementById('artStudioRole').value = currentUser && currentUser.role ? currentUser.role : 'Educator & Technologist';
    document.getElementById('artStudioReadTime').value = '4 min read';
    
    const defaultCover = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80';
    document.getElementById('artStudioCover').value = defaultCover;
    document.getElementById('artStudioCoverAlt').value = '';
    document.getElementById('artStudioSummary').value = '';
    document.getElementById('artStudioContent').value = '';

    currentArticleTags = ['Software & AI', 'DLM ResultDesk', 'EdTech'];
    setArticleStatusState('published');
    updateArticleCoverPreview(defaultCover);

    document.getElementById('artSeoPreviewTitle').textContent = 'Article Title';
    document.getElementById('artSeoPreviewDesc').textContent = 'Brief summary of what this guide teaches...';
  }

  renderArticleTagChips();
  updateArticleWordCount();
};

function saveArticleFromStudio(forcedStatus = null) {
  const title = document.getElementById('artStudioTitle').value.trim();
  const content = document.getElementById('artStudioContent').value.trim();

  if (!title) {
    alert('Please enter a title for this guide.');
    document.getElementById('artStudioTitle').focus();
    return;
  }

  if (!content) {
    alert('Please write some content for this article.');
    document.getElementById('artStudioContent').focus();
    return;
  }

  const status = forcedStatus || currentArticleStatus || 'published';
  const category = document.getElementById('artStudioCategory').value;
  const summary = document.getElementById('artStudioSummary').value.trim() || content.split('\n\n')[0].slice(0, 180);
  const cover = document.getElementById('artStudioCover').value.trim() || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';

  if (currentArticleTags.length === 0) {
    currentArticleTags.push(category);
  }

  const item = {
    id: document.getElementById('artStudioId').value || undefined,
    title: title,
    tag: category,
    tags: [...currentArticleTags],
    status: status,
    author: document.getElementById('artStudioAuthor').value.trim() || 'DLM Team',
    role: document.getElementById('artStudioRole').value.trim(),
    date: document.getElementById('artStudioDate').value,
    readTime: document.getElementById('artStudioReadTime').value || '4 min read',
    cover: cover,
    coverAlt: document.getElementById('artStudioCoverAlt').value.trim() || title,
    summary: summary,
    content: content
  };

  window.DLM_DB.saveArticle(item);
  window.showToast(status === 'draft' ? 'Guide saved as draft!' : 'Guide successfully published!', 'success');
  
  switchToView('articles');
  renderCmsArticlesTable();
  updateOverviewStats();
}

// ==================== NEWS DASHBOARD & DISPATCHES ====================
let newsStatusFilter = 'all';
let newsSearchQuery = '';

function renderCmsNewsTable() {
  const tbody = document.getElementById('cmsNewsTableBody');
  if (!tbody) return;

  const news = window.DLM_DB.getNews();

  const publishedCount = news.filter(n => (n.status || 'published') === 'published').length;
  const draftCount = news.filter(n => n.status === 'draft').length;

  const countAllEl = document.getElementById('countNewsAll');
  const countPubEl = document.getElementById('countNewsPublished');
  const countDraftEl = document.getElementById('countNewsDraft');
  if (countAllEl) countAllEl.textContent = news.length;
  if (countPubEl) countPubEl.textContent = publishedCount;
  if (countDraftEl) countDraftEl.textContent = draftCount;

  let filtered = news;
  if (newsStatusFilter === 'published') {
    filtered = filtered.filter(n => (n.status || 'published') === 'published');
  } else if (newsStatusFilter === 'draft') {
    filtered = filtered.filter(n => n.status === 'draft');
  }

  if (newsSearchQuery.trim() !== '') {
    const q = newsSearchQuery.toLowerCase();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(q) ||
      (n.summary && n.summary.toLowerCase().includes(q)) ||
      (n.category && n.category.toLowerCase().includes(q)) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-dim);">No news items found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const tags = Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : [item.category || 'News'];
    const status = item.status === 'draft' ? 'draft' : 'published';
    const statusLabel = status === 'draft' ? '✎ Draft' : '✓ Published';
    const photo = item.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80';

    return `
      <tr>
        <td>
          <div class="table-post-cell">
            <img src="${photo}" alt="${item.title}" class="table-post-thumb" onerror="this.src='https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80'">
            <div class="table-post-info">
              <span class="table-post-title">${item.title}</span>
              <span class="table-post-meta">
                <span>By ${item.author || 'DLM Team'}</span>
                <span>·</span>
                <span>${item.readTime || '3 min read'}</span>
              </span>
            </div>
          </div>
        </td>
        <td>
          <div class="tag-pills-wrap">
            <span class="tag-chip-sm" style="background:rgba(37,99,235,0.2); font-weight:600;">${item.category}</span>
            ${tags.slice(0, 3).map(t => `<span class="tag-chip-sm">#${t}</span>`).join('')}
          </div>
        </td>
        <td style="white-space:nowrap; font-size:0.84rem; color:var(--text-dim);">${item.date}</td>
        <td>
          <span class="status-pill ${status}">${statusLabel}</span>
        </td>
        <td style="white-space:nowrap;">
          <button class="btn btn-secondary btn-sm" onclick="openNewsStudio('${item.id}')">Edit in Room</button>
          <button class="btn btn-sm" style="background:rgba(239,68,68,0.2); border:1px solid #EF4444; color:#EF4444; margin-left:4px;" onclick="deleteNewsItem('${item.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

// News filters & search
document.getElementById('newsStatusFilterTabs')?.querySelectorAll('.cms-filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#newsStatusFilterTabs .cms-filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    newsStatusFilter = btn.getAttribute('data-filter');
    renderCmsNewsTable();
  });
});

document.getElementById('newsSearchInput')?.addEventListener('input', (e) => {
  newsSearchQuery = e.target.value;
  renderCmsNewsTable();
});

window.deleteNewsItem = function(id) {
  if (confirm('Are you sure you want to permanently delete this news dispatch?')) {
    window.DLM_DB.deleteNews(id);
    window.showToast('News item deleted.', 'success');
    renderCmsNewsTable();
    updateOverviewStats();
  }
};

// ==================== NEWS ROOM STUDIO LOGIC ====================
let currentNewsTags = [];
let currentNewsStatus = 'published';

function setupNewsStudio() {
  document.getElementById('btnAddNewNews')?.addEventListener('click', () => {
    openNewsStudio();
  });

  document.getElementById('btnBackToNews')?.addEventListener('click', () => {
    switchToView('news');
  });

  const titleInput = document.getElementById('newsStudioTitle');
  titleInput?.addEventListener('input', (e) => {
    const title = e.target.value.trim() || 'Untitled Dispatch';
    document.getElementById('newsStudioDocTitle').textContent = title;
  });

  const contentInput = document.getElementById('newsStudioContent');
  contentInput?.addEventListener('input', () => {
    const content = contentInput.value.trim();
    const words = content ? content.split(/\s+/).filter(Boolean).length : 0;
    const readMins = Math.max(1, Math.ceil(words / 180));
    document.getElementById('newsStudioWordCount').textContent = `${words} words · ${readMins} min read`;
  });

  document.getElementById('btnAutoGenerateNewsSummary')?.addEventListener('click', () => {
    const content = contentInput.value.trim();
    if (!content) return;
    const firstPara = content.split('\n\n')[0].replace(/[#*`_>]/g, '').trim();
    const excerpt = firstPara.length > 180 ? firstPara.slice(0, 177) + '...' : firstPara;
    document.getElementById('newsStudioSummary').value = excerpt;
    window.showToast('Lead summary generated!', 'success');
  });

  // Status buttons
  document.getElementById('newsStatusBtnPublished')?.addEventListener('click', () => setNewsStatusState('published'));
  document.getElementById('newsStatusBtnDraft')?.addEventListener('click', () => setNewsStatusState('draft'));

  document.getElementById('btnNewsDateToday')?.addEventListener('click', () => {
    document.getElementById('newsStudioDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });

  // Photo
  const imgInput = document.getElementById('newsStudioImage');
  imgInput?.addEventListener('input', (e) => updateNewsCoverPreview(e.target.value.trim()));

  const fileInput = document.getElementById('newsStudioCoverFileInput');
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      imgInput.value = evt.target.result;
      updateNewsCoverPreview(evt.target.result);
      window.showToast('Photo uploaded!', 'success');
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  document.getElementById('btnNewsChangeImg')?.addEventListener('click', () => fileInput?.click());
  document.getElementById('btnNewsRemoveImg')?.addEventListener('click', () => {
    imgInput.value = '';
    updateNewsCoverPreview('');
  });

  document.querySelectorAll('#newsCoverPresets .image-preset-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const url = thumb.getAttribute('data-url');
      if (url) {
        imgInput.value = url;
        updateNewsCoverPreview(url);
      }
    });
  });

  // Tags
  const tagInput = document.getElementById('newsTagInputField');
  tagInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.value.trim().replace(/^#/, '');
      if (val && !currentNewsTags.some(t => t.toLowerCase() === clean.toLowerCase())) {
        currentNewsTags.push(val);
        renderNewsTagChips();
        tagInput.value = '';
      }
    }
  });

  document.querySelectorAll('#newsSuggestedTagsCloud .suggested-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-tag');
      if (t && !currentNewsTags.includes(t)) {
        currentNewsTags.push(t);
        renderNewsTagChips();
      }
    });
  });

  setupEditorialToolbar('newsStudioContent', 'newsStudioLivePreview', 'btnToggleNewsPreview', 'toolbar-btn', 'data-news-tool');

  document.getElementById('btnToggleNewsInspector')?.addEventListener('click', () => {
    document.getElementById('newsStudioGrid')?.classList.toggle('inspector-collapsed');
  });

  document.getElementById('btnNewsSaveDraft')?.addEventListener('click', () => saveNewsFromStudio('draft'));
  document.getElementById('btnNewsPublish')?.addEventListener('click', () => saveNewsFromStudio('published'));
}

function setNewsStatusState(status) {
  currentNewsStatus = status;
  const pubBtn = document.getElementById('newsStatusBtnPublished');
  const draftBtn = document.getElementById('newsStatusBtnDraft');
  const badge = document.getElementById('newsStudioStatusBadge');

  if (status === 'published') {
    pubBtn.classList.add('active', 'published');
    draftBtn.classList.remove('active', 'draft');
    if (badge) {
      badge.className = 'status-pill published';
      badge.textContent = '● Published';
    }
  } else {
    draftBtn.classList.add('active', 'draft');
    pubBtn.classList.remove('active', 'published');
    if (badge) {
      badge.className = 'status-pill draft';
      badge.textContent = '✎ Draft';
    }
  }
}

function updateNewsCoverPreview(url) {
  const frame = document.getElementById('newsCoverPreviewFrame');
  const img = document.getElementById('newsCoverPreviewImg');
  const empty = document.getElementById('newsCoverEmptyState');

  if (url) {
    img.src = url;
    img.style.display = 'block';
    empty.style.display = 'none';
    frame.classList.add('has-image');
  } else {
    img.src = '';
    img.style.display = 'none';
    empty.style.display = 'flex';
    frame.classList.remove('has-image');
  }
}

function renderNewsTagChips() {
  const container = document.getElementById('newsTagsChipsContainer');
  const countBadge = document.getElementById('newsTagsCountBadge');
  if (!container) return;

  if (countBadge) countBadge.textContent = `${currentNewsTags.length} tags`;

  if (currentNewsTags.length === 0) {
    container.innerHTML = `<span style="font-size:0.75rem; color:var(--text-dim);">No tags added.</span>`;
    return;
  }

  container.innerHTML = currentNewsTags.map((tag, idx) => `
    <span class="tag-chip-item">
      <span>#${tag}</span>
      <button type="button" class="tag-chip-remove" onclick="removeNewsTag(${idx})">×</button>
    </span>
  `).join('');
}

window.removeNewsTag = function(idx) {
  currentNewsTags.splice(idx, 1);
  renderNewsTagChips();
};

window.openNewsStudio = function(id = null) {
  const views = document.querySelectorAll('.cms-view');
  views.forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });

  const studio = document.getElementById('view-news-editor');
  studio.style.display = 'block';
  studio.classList.add('active');

  if (id) {
    const item = window.DLM_DB.getNewsById(id);
    if (!item) return;

    document.getElementById('newsStudioId').value = item.id;
    document.getElementById('newsStudioTitle').value = item.title;
    document.getElementById('newsStudioDocTitle').textContent = item.title;
    document.getElementById('newsStudioCategory').value = item.category;
    document.getElementById('newsStudioDate').value = item.date;
    document.getElementById('newsStudioAuthor').value = item.author || 'DLM Media Team';
    document.getElementById('newsStudioReadTime').value = item.readTime || '3 min read';
    document.getElementById('newsStudioImage').value = item.image || '';
    document.getElementById('newsStudioSummary').value = item.summary || '';
    document.getElementById('newsStudioContent').value = item.content || '';

    currentNewsTags = Array.isArray(item.tags) && item.tags.length > 0 ? [...item.tags] : [item.category];
    setNewsStatusState(item.status === 'draft' ? 'draft' : 'published');
    updateNewsCoverPreview(item.image);
  } else {
    document.getElementById('newsStudioId').value = '';
    document.getElementById('newsStudioTitle').value = '';
    document.getElementById('newsStudioDocTitle').textContent = 'Untitled Dispatch';
    document.getElementById('newsStudioCategory').value = 'Software Deployment';
    document.getElementById('newsStudioDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('newsStudioAuthor').value = 'DLM Media Team';
    document.getElementById('newsStudioReadTime').value = '3 min read';

    const defaultImg = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
    document.getElementById('newsStudioImage').value = defaultImg;
    document.getElementById('newsStudioSummary').value = '';
    document.getElementById('newsStudioContent').value = '';

    currentNewsTags = ['Deployment', 'LagosSchools'];
    setNewsStatusState('published');
    updateNewsCoverPreview(defaultImg);
  }

  renderNewsTagChips();
};

function saveNewsFromStudio(forcedStatus = null) {
  const title = document.getElementById('newsStudioTitle').value.trim();
  const content = document.getElementById('newsStudioContent').value.trim();

  if (!title) {
    alert('Please enter a headline for this news dispatch.');
    document.getElementById('newsStudioTitle').focus();
    return;
  }

  const status = forcedStatus || currentNewsStatus || 'published';
  const category = document.getElementById('newsStudioCategory').value;
  const summary = document.getElementById('newsStudioSummary').value.trim() || content.split('\n\n')[0].slice(0, 150);

  const item = {
    id: document.getElementById('newsStudioId').value || undefined,
    title: title,
    category: category,
    tags: currentNewsTags.length > 0 ? [...currentNewsTags] : [category],
    status: status,
    date: document.getElementById('newsStudioDate').value,
    readTime: document.getElementById('newsStudioReadTime').value || '3 min read',
    author: document.getElementById('newsStudioAuthor').value.trim() || 'DLM Media Team',
    image: document.getElementById('newsStudioImage').value.trim() || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    summary: summary,
    content: content
  };

  window.DLM_DB.saveNews(item);
  window.showToast(status === 'draft' ? 'News saved as draft!' : 'News dispatch published!', 'success');
  
  switchToView('news');
  renderCmsNewsTable();
  updateOverviewStats();
}

// ==================== EDITORIAL TOOLBAR HELPER ====================
function setupEditorialToolbar(textareaId, previewId, toggleBtnId, btnClass, dataAttr = 'data-tool') {
  const textarea = document.getElementById(textareaId);
  const preview = document.getElementById(previewId);
  const toggleBtn = document.getElementById(toggleBtnId);

  if (!textarea) return;

  // Toggle preview mode
  toggleBtn?.addEventListener('click', () => {
    const isPreview = preview.classList.toggle('active');
    textarea.style.display = isPreview ? 'none' : 'block';
    toggleBtn.textContent = isPreview ? '✏ Edit Markdown' : '👁 Live Preview';
    if (isPreview) {
      preview.innerHTML = parseSimpleMarkdown(textarea.value);
    }
  });

  // Toolbar clicks
  document.querySelectorAll(`[${dataAttr}]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute(dataAttr);
      applyMarkdownAction(textarea, action);
    });
  });
}

function applyMarkdownAction(textarea, action) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  let replacement = '';

  switch(action) {
    case 'bold':
      replacement = `**${selected || 'bold text'}**`;
      break;
    case 'italic':
      replacement = `*${selected || 'italic text'}*`;
      break;
    case 'h2':
      replacement = `\n## ${selected || 'Section Heading'}\n`;
      break;
    case 'h3':
      replacement = `\n### ${selected || 'Sub-heading'}\n`;
      break;
    case 'quote':
      replacement = `\n> ${selected || 'Quote block...'}\n`;
      break;
    case 'ul':
      replacement = selected ? selected.split('\n').map(l => `- ${l}`).join('\n') : '\n- Key point 1\n- Key point 2\n';
      break;
    case 'ol':
      replacement = selected ? selected.split('\n').map((l, i) => `${i+1}. ${l}`).join('\n') : '\n1. First step\n2. Second step\n';
      break;
    case 'code':
      replacement = `\`${selected || 'code snippet'}\``;
      break;
    case 'link':
      replacement = `[${selected || 'link text'}](https://example.com)`;
      break;
    case 'hr':
      replacement = '\n---\n';
      break;
  }

  textarea.setRangeText(replacement, start, end, 'end');
  textarea.focus();
}

function parseSimpleMarkdown(text) {
  if (!text) return '<p style="color:var(--text-dim);">Nothing written yet.</p>';
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" style="color:var(--dlm-blue-light); text-decoration:underline;">$1</a>')
    .replace(/\n\n/g, '<p></p>')
    .replace(/\n/g, '<br>');
}

// ==================== DOWNLOADS CRUD ====================
function renderCmsDownloadsTable() {
  const tbody = document.getElementById('cmsDownloadsTableBody');
  if (!tbody) return;

  const downloads = window.DLM_DB.getDownloads();
  if (downloads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-dim);">No software releases registered yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = downloads.map(dl => `
    <tr>
      <td><strong>${dl.name}</strong></td>
      <td><span class="version-badge font-mono">${dl.version}</span></td>
      <td>${dl.platform}</td>
      <td>${dl.tag}</td>
      <td>${dl.size}</td>
      <td style="white-space:nowrap;">
        <button class="btn btn-secondary btn-sm" onclick="editDownloadItem('${dl.id}')">Edit</button>
        <button class="btn btn-sm" style="background:#EF4444; color:#fff;" onclick="deleteDownloadItem('${dl.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

window.editDownloadItem = function(id) {
  const item = window.DLM_DB.getDownloadById(id);
  if (!item) return;

  document.getElementById('dlFormId').value = item.id;
  document.getElementById('dlFormName').value = item.name;
  document.getElementById('dlFormVersion').value = item.version;
  document.getElementById('dlFormPlatform').value = item.platform;
  document.getElementById('dlFormTag').value = item.tag;
  document.getElementById('dlFormSize').value = item.size;
  document.getElementById('dlFormDate').value = item.date;
  document.getElementById('dlFormUrl').value = item.downloadUrl || '#';
  document.getElementById('dlFormDesc').value = item.description || '';
  document.getElementById('dlFormFeatures').value = (item.features || []).join('\n');

  document.getElementById('dlModalTitle').textContent = 'Edit Release Package';
  openModal('modalDownloadForm');
};

window.deleteDownloadItem = function(id) {
  if (confirm('Are you sure you want to permanently delete this software release?')) {
    window.DLM_DB.deleteDownload(id);
    window.showToast('Release package deleted.', 'success');
    renderCmsDownloadsTable();
    updateOverviewStats();
  }
};

function setupDownloadForm() {
  document.getElementById('btnAddNewDownload')?.addEventListener('click', () => {
    document.getElementById('formDownload').reset();
    document.getElementById('dlFormId').value = '';
    document.getElementById('dlFormDate').value = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    document.getElementById('dlModalTitle').textContent = 'Register New Software Release';
    openModal('modalDownloadForm');
  });

  document.getElementById('formDownload')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawFeatures = document.getElementById('dlFormFeatures').value.trim();
    const featuresArray = rawFeatures ? rawFeatures.split('\n').map(s => s.trim()).filter(Boolean) : [];

    const item = {
      id: document.getElementById('dlFormId').value || undefined,
      name: document.getElementById('dlFormName').value.trim(),
      version: document.getElementById('dlFormVersion').value.trim(),
      platform: document.getElementById('dlFormPlatform').value.trim(),
      tag: document.getElementById('dlFormTag').value,
      size: document.getElementById('dlFormSize').value.trim(),
      date: document.getElementById('dlFormDate').value,
      downloadUrl: document.getElementById('dlFormUrl').value.trim() || '#download',
      description: document.getElementById('dlFormDesc').value.trim(),
      features: featuresArray
    };

    window.DLM_DB.saveDownload(item);
    window.showToast('Software release registered and active!', 'success');
    closeAllModals();
    renderCmsDownloadsTable();
    updateOverviewStats();
  });
}

// ==================== WEBINARS CRUD ====================
function renderCmsWebinarsTable() {
  const tbody = document.getElementById('cmsWebinarsTableBody');
  if (!tbody) return;

  const webinars = window.DLM_DB.getWebinars();
  tbody.innerHTML = webinars.map(w => `
    <tr>
      <td><strong>${w.title}</strong></td>
      <td><span class="font-mono text-blue">${w.type}</span></td>
      <td>${w.date}</td>
      <td>${w.speakers}</td>
      <td>
        <button class="btn btn-sm" style="background:#EF4444; color:#fff;" onclick="deleteWebinarItem('${w.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

window.deleteWebinarItem = function(id) {
  if (confirm('Delete this webinar from the homepage schedule?')) {
    window.DLM_DB.deleteWebinar(id);
    window.showToast('Webinar removed.', 'success');
    renderCmsWebinarsTable();
    updateOverviewStats();
  }
};

function setupWebinarForm() {
  document.getElementById('btnAddNewWebinar')?.addEventListener('click', () => {
    document.getElementById('formWebinar').reset();
    openModal('modalWebinarForm');
  });

  document.getElementById('formWebinar')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      title: document.getElementById('webFormTitle').value.trim(),
      type: document.getElementById('webFormType').value,
      badge: 'Upcoming',
      date: document.getElementById('webFormDate').value,
      time: document.getElementById('webFormTime').value,
      speakers: document.getElementById('webFormSpeakers').value.trim(),
      description: document.getElementById('webFormDesc').value.trim(),
      link: '#register'
    };

    window.DLM_DB.saveWebinar(item);
    window.showToast('Webinar added to schedule!', 'success');
    closeAllModals();
    renderCmsWebinarsTable();
    updateOverviewStats();
  });
}

// ==================== BACKUP & RESTORE ====================
function setupBackupHandlers() {
  // 1. Export Live Website content.json
  document.getElementById('btnExportLiveContent')?.addEventListener('click', () => {
    const data = {
      news: window.DLM_DB.getNews(),
      articles: window.DLM_DB.getArticles(),
      downloads: window.DLM_DB.getDownloads(),
      webinars: window.DLM_DB.getWebinars()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
    window.showToast('Downloaded content.json! Replace assets/data/content.json & push to GitHub for all visitors to see.', 'success');
  });

  // 2. Toggle GitHub Sync Configuration Panel
  const panel = document.getElementById('githubSyncPanel');
  const repoInput = document.getElementById('ghRepoInput');
  const tokenInput = document.getElementById('ghTokenInput');

  if (repoInput) repoInput.value = localStorage.getItem('dlm_gh_repo') || 'divineleadsmedia/divineleadsmedia';
  if (tokenInput) tokenInput.value = localStorage.getItem('dlm_gh_token') || '';

  document.getElementById('btnToggleGitHubSync')?.addEventListener('click', () => {
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById('btnSaveGitHubSync')?.addEventListener('click', () => {
    const repo = (repoInput?.value || '').trim();
    const token = (tokenInput?.value || '').trim();
    localStorage.setItem('dlm_gh_repo', repo);
    localStorage.setItem('dlm_gh_token', token);
    window.showToast('GitHub cloud sync configuration saved!', 'success');
  });

  // 3. One-Click Push to GitHub via API
  document.getElementById('btnSyncNowGitHub')?.addEventListener('click', async () => {
    const repo = (repoInput?.value || '').trim() || localStorage.getItem('dlm_gh_repo');
    const token = (tokenInput?.value || '').trim() || localStorage.getItem('dlm_gh_token');

    if (!repo || !token) {
      alert('Please enter your GitHub Repository (e.g. divineleadsmedia/divineleadsmedia) and Personal Access Token.');
      if (panel) panel.style.display = 'block';
      return;
    }

    const btn = document.getElementById('btnSyncNowGitHub');
    const originalText = btn.textContent;
    btn.textContent = 'Pushing to GitHub...';
    btn.disabled = true;

    try {
      const data = {
        news: window.DLM_DB.getNews(),
        articles: window.DLM_DB.getArticles(),
        downloads: window.DLM_DB.getDownloads(),
        webinars: window.DLM_DB.getWebinars()
      };
      const jsonStr = JSON.stringify(data, null, 2);

      // Check current file SHA from GitHub
      const fileUrl = `https://api.github.com/repos/${repo}/contents/assets/data/content.json`;
      let sha = null;
      try {
        const getRes = await fetch(fileUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }
      } catch (e) {}

      // Base64 encode safely with UTF-8 support
      const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));
      const payload = {
        message: 'chore(cms): update live website posts via CMS studio',
        content: base64Content,
        branch: 'main'
      };
      if (sha) payload.sha = sha;

      const putRes = await fetch(fileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!putRes.ok) {
        const errJson = await putRes.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${putRes.status}`);
      }

      window.showToast('🚀 Successfully pushed to GitHub! Live website updating in ~30s.', 'success');
    } catch (err) {
      alert('Failed to push to GitHub: ' + err.message + '\n\nTip: Make sure your token has "repo" permissions and the repository name is correct.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  // 4. Standard Backup & Restore
  document.getElementById('btnExportBackup')?.addEventListener('click', () => {
    const jsonStr = window.DLM_DB.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `divineleads-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.showToast('Complete backup exported!', 'success');
  });

  const fileInput = document.getElementById('backupFileInput');
  document.getElementById('btnImportBackup')?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        window.DLM_DB.importBackupJSON(evt.target.result);
        window.showToast('Backup restored successfully!', 'success');
        updateOverviewStats();
        renderCmsNewsTable();
        renderCmsArticlesTable();
        renderCmsDownloadsTable();
        renderCmsWebinarsTable();
      } catch(err) {
        alert(err.message);
      }
    };
    reader.readAsText(file);
    fileInput.value = '';
  });

  document.getElementById('btnResetDefaults')?.addEventListener('click', () => {
    if (confirm('WARNING: This will reset all news, articles, and releases back to initial seed data. Continue?')) {
      window.DLM_DB.resetToDefaults();
      window.showToast('Data reset to original factory seeds.', 'success');
      updateOverviewStats();
      renderCmsNewsTable();
      renderCmsArticlesTable();
      renderCmsDownloadsTable();
      renderCmsWebinarsTable();
    }
  });
}
