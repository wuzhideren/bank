document.addEventListener('DOMContentLoaded', function() {
  // 初始化标签页
  initializeTabs();
  
  // 初始化用户笔记功能
  initializeUserNotes();
  
  // 加载所有图表
  loadAllCharts();
});

// 标签页切换功能
function initializeTabs() {
  const tabLinks = document.querySelectorAll('.tab-link');
  
  tabLinks.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // 移除所有标签页的活动状态
      document.querySelectorAll('.tab-link').forEach(t => {
        t.classList.remove('active');
      });
      
      // 隐藏所有内容
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // 激活当前标签页
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// 用户笔记本地存储功能
function initializeUserNotes() {
  const noteTextareas = document.querySelectorAll('.user-notes textarea');
  const saveButtons = document.querySelectorAll('.save-notes');
  
  // 加载已保存的笔记
  noteTextareas.forEach(textarea => {
    const noteId = textarea.getAttribute('data-note-id');
    const savedNote = localStorage.getItem(`bank_analysis_note_${noteId}`);
    
    if (savedNote) {
      textarea.value = savedNote;
    }
  });
  
  // 添加保存功能
  saveButtons.forEach(button => {
    button.addEventListener('click', function() {
      const noteId = this.getAttribute('data-note-id');
      const textarea = document.querySelector(`.user-notes textarea[data-note-id="${noteId}"]`);
      
      if (textarea) {
        localStorage.setItem(`bank_analysis_note_${noteId}`, textarea.value);
        
        // 显示保存成功提示
        const saveMessage = document.createElement('span');
        saveMessage.textContent = '已保存';
        saveMessage.style.color = 'green';
        saveMessage.style.marginLeft = '10px';
        
        this.parentNode.appendChild(saveMessage);
        
        // 2秒后自动移除提示
        setTimeout(() => {
          saveMessage.remove();
        }, 2000);
      }
    });
  });
}

// 加载所有图表
function loadAllCharts() {
  // 资产质量趋势图
  renderAssetQualityChart();
  
  // 净息差变化图
  renderNIMChart();
  
  // 盈利能力指标图
  renderProfitabilityChart();
  
  // 不良贷款率分机构图
  renderNPLByBankTypeChart();
  
  // 贷款投向分布图
  renderLoanDistributionChart();
  
  // 资本充足率变化图
  renderCapitalAdequacyChart();
}

// 渲染资产质量趋势图
function renderAssetQualityChart() {
  if (!document.getElementById('assetQualityChart')) return;
  
  const ctx = document.getElementById('assetQualityChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020Q4', '2021Q4', '2022Q4', '2023Q4', '2024Q4'],
      datasets: [
        {
          label: '不良贷款率 (%)',
          data: [1.84, 1.73, 1.63, 1.59, 1.50],
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          borderWidth: 2,
          tension: 0.2,
          fill: true,
        },
        {
          label: '关注类贷款占比 (%)',
          data: [2.57, 2.31, 2.25, 2.20, 2.22],
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          borderWidth: 2,
          tension: 0.2,
          fill: true,
        },
        {
          label: '拨备覆盖率 (%)',
          data: [184.47, 196.91, 205.85, 205.14, 211.19],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderWidth: 2,
          tension: 0.2,
          fill: true,
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '2020-2024年商业银行资产质量核心指标变化',
          font: { size: 16 }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '百分比 (%)'
          },
          suggestedMax: 3.5
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: '拨备覆盖率 (%)'
          },
          min: 180,
          max: 220,
          grid: {
            drawOnChartArea: false
          }
        },
        x: {
          title: {
            display: true,
            text: '报告期'
          }
        }
      }
    }
  });
}

// 渲染净息差变化图
function renderNIMChart() {
  if (!document.getElementById('nimChart')) return;
  
  const ctx = document.getElementById('nimChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020Q4', '2021Q4', '2022Q4', '2023Q4', '2024Q4'],
      datasets: [
        {
          label: '全行业净息差 (%)',
          data: [2.10, 2.08, 1.91, 1.69, 1.52],
          borderColor: '#4d9de0',
          backgroundColor: 'rgba(77, 157, 224, 0.1)',
          borderWidth: 3,
          tension: 0.2,
          fill: true,
        },
        {
          label: '大型银行净息差 (%)',
          data: [2.05, 2.04, 1.90, 1.62, 1.44],
          borderColor: '#1c3850',
          borderWidth: 2,
          tension: 0.2,
          fill: false,
        },
        {
          label: '股份制银行净息差 (%)',
          data: [2.07, 2.13, 1.99, 1.76, 1.61],
          borderColor: '#28a745',
          borderWidth: 2,
          tension: 0.2,
          fill: false,
        },
        {
          label: '城市商业银行净息差 (%)',
          data: [2.00, 1.91, 1.67, 1.57, 1.38],
          borderColor: '#ffc107',
          borderWidth: 2,
          tension: 0.2,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '2020-2024年商业银行净息差变化趋势',
          font: { size: 16 }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 1.5,
              yMax: 1.5,
              borderColor: 'rgba(255, 0, 0, 0.5)',
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                content: '历史低位',
                enabled: true,
                position: 'end'
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: '净息差 (%)'
          },
          min: 1.3,
          max: 2.3
        },
        x: {
          title: {
            display: true,
            text: '报告期'
          }
        }
      }
    }
  });
}

// 渲染盈利能力指标图
function renderProfitabilityChart() {
  if (!document.getElementById('profitabilityChart')) return;
  
  const ctx = document.getElementById('profitabilityChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2020Q4', '2021Q4', '2022Q4', '2023Q4', '2024Q4'],
      datasets: [
        {
          label: 'ROA (%)',
          data: [0.77, 0.79, 0.76, 0.70, 0.63],
          backgroundColor: '#4d9de0',
          borderColor: '#366994',
          borderWidth: 1
        },
        {
          label: 'ROE (%)',
          data: [9.48, 9.64, 9.33, 8.93, 8.10],
          backgroundColor: '#28a745',
          borderColor: '#1e7e34',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '2020-2024年商业银行盈利能力指标变化',
          font: { size: 16 }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'ROA (%)'
          },
          position: 'left',
          max: 1.0
        },
        y1: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'ROE (%)'
          },
          position: 'right',
          max: 12,
          grid: {
            drawOnChartArea: false
          }
        },
        x: {
          title: {
            display: true,
            text: '报告期'
          }
        }
      }
    }
  });
}

// 渲染不良贷款率分机构图
function renderNPLByBankTypeChart() {
  if (!document.getElementById('nplByBankTypeChart')) return;
  
  const ctx = document.getElementById('nplByBankTypeChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['全行业', '大型商业银行', '股份制银行', '城市商业银行', '农村商业银行'],
      datasets: [
        {
          label: '2023年不良贷款率 (%)',
          data: [1.59, 1.26, 1.26, 1.75, 2.80],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '2024年不良贷款率 (%)',
          data: [1.50, 1.23, 1.22, 1.76, 2.80],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '不同类型银行不良贷款率对比',
          font: { size: 16 }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '不良贷款率 (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: '银行类型'
          }
        }
      }
    }
  });
}

// 渲染贷款投向分布图
function renderLoanDistributionChart() {
  if (!document.getElementById('loanDistributionChart')) return;
  
  const ctx = document.getElementById('loanDistributionChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['企事业单位经营性贷款', '住户消费性贷款', '住户经营性贷款', '其他贷款'],
      datasets: [{
        data: [693300, 210100, 241400, 1034114],
        backgroundColor: [
          '#4d9de0',
          '#28a745',
          '#ffc107',
          '#6c757d'
        ],
        borderColor: [
          '#366994',
          '#1e7e34',
          '#d39e00',
          '#5a6268'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '2024年商业银行贷款投向分布（单位：亿元）',
          font: { size: 16 }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw;
              const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value.toLocaleString()}亿元 (${percentage}%)`;
            }
          }
        },
        legend: {
          position: 'right'
        }
      }
    }
  });
}

// 渲染资本充足率变化图
function renderCapitalAdequacyChart() {
  if (!document.getElementById('capitalAdequacyChart')) return;
  
  const ctx = document.getElementById('capitalAdequacyChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020Q4', '2021Q4', '2022Q4', '2023Q4', '2024Q4'],
      datasets: [
        {
          label: '资本充足率 (%)',
          data: [14.70, 15.13, 15.17, 15.06, 15.74],
          borderColor: '#4d9de0',
          backgroundColor: 'rgba(77, 157, 224, 0.1)',
          borderWidth: 3,
          tension: 0.2,
          fill: true,
        },
        {
          label: '核心一级资本充足率 (%)',
          data: [10.72, 10.78, 10.74, 10.54, 11.00],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderWidth: 3,
          tension: 0.2,
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '2020-2024年商业银行资本充足率变化',
          font: { size: 16 }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: '百分比 (%)'
          },
          min: 10,
          max: 16
        },
        x: {
          title: {
            display: true,
            text: '报告期'
          }
        }
      }
    }
  });
} 