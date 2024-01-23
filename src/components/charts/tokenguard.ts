
// (function (root, factory) {
//   if (typeof define === 'function' && define.amd) {
//       // AMD. Register as an anonymous module.
//       define(['exports', 'echarts'], factory);
//   } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
//       // CommonJS
//       factory(exports, require('echarts'));
//   } else {
//       // Browser globals
//       factory({}, root.echarts);
//   }
// }(this, function (exports, echarts) {
//   var log = function (msg) {
//       if (typeof console !== 'undefined') {
//           console && console.error && console.error(msg);
//       }
//   };
//   if (!echarts) {
//       log('ECharts is not Loaded');
//       return;
//   }


export default {
  color: [
    "#42ac8a",
    "#fece71",
    "#3b687e",
    "#81e2c6",
    "#5b94af",
    "#8ea8b5"
  ],
  backgroundColor: "rgba(255,255,255,0)",
  textStyle: {},
  title: {
    textStyle: {
      color: "#090909"
    },
    subtextStyle: {
      color: "#626262"
    }
  },
  line: {
    itemStyle: {
      borderWidth: 1,
      borderColor: "#ccc"
    },
    lineStyle: {
      width: 3
    },
    symbolSize: 4,
    symbol: "emptyRoundRect",
    smooth: true
  },
  radar: {
    itemStyle: {
      borderWidth: 1,
      borderColor: "#ccc"
    },
    lineStyle: {
      width: 3
    },
    symbolSize: 4,
    symbol: "emptyRoundRect",
    smooth: true
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: "#3c3c3c"
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    }
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    }
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: "#ccc"
      },
      emphasis: {
        borderWidth: 0,
        borderColor: "#ccc"
      }
    }
  },
  candlestick: {
    itemStyle: {
      color: "#093c56",
      color0: "transparent",
      borderColor: "#d0648a",
      borderColor0: "#22c3aa",
      borderWidth: "1"
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#3c3c3c"
    },
    lineStyle: {
      width: "1",
      color: "#cccccc"
    },
    symbolSize: 4,
    symbol: "emptyRoundRect",
    smooth: true,
    color: [
      "#42ac8a",
      "#fece71",
      "#3b687e",
      "#81e2c6",
      "#5b94af",
      "#8ea8b5"
    ],
    label: {
      color: "#ffffff"
    }
  },
  map: {
    itemStyle: {
      areaColor: "#eeeeee",
      borderColor: "#999999",
      borderWidth: 0.5
    },
    label: {
      color: "#28544e"
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(34,195,170,0.25)",
        borderColor: "#22c3aa",
        borderWidth: 1
      },
      label: {
        color: "#349e8e"
      }
    }
  },
  geo: {
    itemStyle: {
      areaColor: "#eeeeee",
      borderColor: "#999999",
      borderWidth: 0.5
    },
    label: {
      color: "#28544e"
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(34,195,170,0.25)",
        borderColor: "#22c3aa",
        borderWidth: 1
      },
      label: {
        color: "#349e8e"
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc"
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333"
      }
    },
    axisLabel: {
      show: true,
      color: "#3c3c3c"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          "#eeeeee"
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc"
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333"
      }
    },
    axisLabel: {
      show: true,
      color: "#3c3c3c"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          "#eeeeee"
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc"
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333"
      }
    },
    axisLabel: {
      show: true,
      color: "#3c3c3c"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          "#eeeeee"
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#cccccc"
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333"
      }
    },
    axisLabel: {
      show: true,
      color: "#3c3c3c"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          "#eeeeee"
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
            "rgba(250,250,250,0.05)",
            "rgba(200,200,200,0.02)"
        ]
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: "#3c3c3c"
      },
      emphasis: {
        iconStyle: {
          borderColor: "#3c3c3c"
        }
      }
    },
    legend: {
      textStyle: {
        color: "#3c3c3c"
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: "#3c3c3c",
          width: 1
        },
        crossStyle: {
          color: "#3c3c3c",
          width: 1
        }
      }
    },
  timeline: {
      lineStyle: {
        color: "#4ea397",
        width: 1
      },
      itemStyle: {
        color: "#4ea397",
        borderWidth: 1
      },
      controlStyle: {
        color: "#4ea397",
        borderColor: "#4ea397",
        borderWidth: 0.5
      },
      checkpointStyle: {
        color: "#4ea397",
        borderColor: "#3cebd2"
      },
      label: {
        color: "#4ea397"
      },
      emphasis: {
          itemStyle: {
            color: "#4ea397"
          },
          controlStyle: {
            color: "#4ea397",
            borderColor: "#4ea397",
            borderWidth: 0.5
          },
          label: {
            "color": "#4ea397"
          }
      }
  },
  visualMap: {
    color: [
      "#093c56",
      "#3b687e",
      "#8ea8b5"
    ]
  },
  dataZoom: {
      backgroundColor: "rgba(255,255,255,0)",
      dataBackgroundColor: "rgba(222,222,222,1)",
      fillerColor: "rgba(114,230,212,0.25)",
      handleColor: "#cccccc",
      handleSize: "100%",
      textStyle: {
        color: "#999999"
      }
  },
  markPoint: {
    label: {
      color: "#ffffff"
    },
    emphasis: {
      label: {
        color: "#ffffff"
      }
    }
  }
}
}


// @ts-ignore
// export default {
//   color: ["#893448", "#d95850", "#eb8146", "#ffb248", "#f2d643", "#ebdba4"],
//   backgroundColor: "rgba(242,234,191,0.15)",
//   textStyle: {},
//   title: {
//     textStyle: {
//       color: "#893448"
//     },
//     subtextStyle: {
//       color: "#d95850"
//     }
//   },
//   line: {
//     itemStyle: {
//       normal: {
//         borderWidth: "2"
//       }
//     },
//     lineStyle: {
//       normal: {
//         width: "2"
//       }
//     },
//     symbolSize: "6",
//     symbol: "emptyCircle",
//     smooth: true
//   },
//   radar: {
//     itemStyle: {
//       normal: {
//         borderWidth: "2"
//       }
//     },
//     lineStyle: {
//       normal: {
//         width: "2"
//       }
//     },
//     symbolSize: "6",
//     symbol: "emptyCircle",
//     smooth: true
//   },
//   bar: {
//     itemStyle: {
//       normal: {
//         barBorderWidth: 0,
//         barBorderColor: "#ccc"
//       },
//       emphasis: {
//         barBorderWidth: 0,
//         barBorderColor: "#ccc"
//       }
//     }
//   },
//   pie: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   scatter: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   boxplot: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   parallel: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   sankey: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   funnel: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   gauge: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       },
//       emphasis: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     }
//   },
//   candlestick: {
//     itemStyle: {
//       normal: {
//         color: "#eb8146",
//         color0: "transparent",
//         borderColor: "#d95850",
//         borderColor0: "#58c470",
//         borderWidth: "2"
//       }
//     }
//   },
//   graph: {
//     itemStyle: {
//       normal: {
//         borderWidth: 0,
//         borderColor: "#ccc"
//       }
//     },
//     lineStyle: {
//       normal: {
//         width: 1,
//         color: "#aaa"
//       }
//     },
//     symbolSize: "6",
//     symbol: "emptyCircle",
//     smooth: true,
//     color: ["#893448", "#d95850", "#eb8146", "#ffb248", "#f2d643", "#ebdba4"],
//     label: {
//       normal: {
//         textStyle: {
//           color: "#ffffff"
//         }
//       }
//     }
//   },
//   map: {
//     itemStyle: {
//       normal: {
//         areaColor: "#f3f3f3",
//         borderColor: "#999999",
//         borderWidth: 0.5
//       },
//       emphasis: {
//         areaColor: "rgba(255,178,72,1)",
//         borderColor: "#eb8146",
//         borderWidth: 1
//       }
//     },
//     label: {
//       normal: {
//         textStyle: {
//           color: "#893448"
//         }
//       },
//       emphasis: {
//         textStyle: {
//           color: "rgb(137,52,72)"
//         }
//       }
//     }
//   },
//   geo: {
//     itemStyle: {
//       normal: {
//         areaColor: "#f3f3f3",
//         borderColor: "#999999",
//         borderWidth: 0.5
//       },
//       emphasis: {
//         areaColor: "rgba(255,178,72,1)",
//         borderColor: "#eb8146",
//         borderWidth: 1
//       }
//     },
//     label: {
//       normal: {
//         textStyle: {
//           color: "#893448"
//         }
//       },
//       emphasis: {
//         textStyle: {
//           color: "rgb(137,52,72)"
//         }
//       }
//     }
//   },
//   categoryAxis: {
//     axisLine: {
//       show: true,
//       lineStyle: {
//         color: "#aaaaaa"
//       }
//     },
//     axisTick: {
//       show: false,
//       lineStyle: {
//         color: "#333"
//       }
//     },
//     axisLabel: {
//       show: true,
//       textStyle: {
//         color: "#999999"
//       }
//     },
//     splitLine: {
//       show: true,
//       lineStyle: {
//         color: ["#e6e6e6"]
//       }
//     },
//     splitArea: {
//       show: false,
//       areaStyle: {
//         color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
//       }
//     }
//   },
//   valueAxis: {
//     axisLine: {
//       show: true,
//       lineStyle: {
//         color: "#aaaaaa"
//       }
//     },
//     axisTick: {
//       show: false,
//       lineStyle: {
//         color: "#333"
//       }
//     },
//     axisLabel: {
//       show: true,
//       textStyle: {
//         color: "#999999"
//       }
//     },
//     splitLine: {
//       show: true,
//       lineStyle: {
//         color: ["#e6e6e6"]
//       }
//     },
//     splitArea: {
//       show: false,
//       areaStyle: {
//         color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
//       }
//     }
//   },
//   logAxis: {
//     axisLine: {
//       show: true,
//       lineStyle: {
//         color: "#aaaaaa"
//       }
//     },
//     axisTick: {
//       show: false,
//       lineStyle: {
//         color: "#333"
//       }
//     },
//     axisLabel: {
//       show: true,
//       textStyle: {
//         color: "#999999"
//       }
//     },
//     splitLine: {
//       show: true,
//       lineStyle: {
//         color: ["#e6e6e6"]
//       }
//     },
//     splitArea: {
//       show: false,
//       areaStyle: {
//         color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
//       }
//     }
//   },
//   timeAxis: {
//     axisLine: {
//       show: true,
//       lineStyle: {
//         color: "#aaaaaa"
//       }
//     },
//     axisTick: {
//       show: false,
//       lineStyle: {
//         color: "#333"
//       }
//     },
//     axisLabel: {
//       show: true,
//       textStyle: {
//         color: "#999999"
//       }
//     },
//     splitLine: {
//       show: true,
//       lineStyle: {
//         color: ["#e6e6e6"]
//       }
//     },
//     splitArea: {
//       show: false,
//       areaStyle: {
//         color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
//       }
//     }
//   },
//   toolbox: {
//     iconStyle: {
//       normal: {
//         borderColor: "#999"
//       },
//       emphasis: {
//         borderColor: "#666"
//       }
//     }
//   },
//   legend: {
//     textStyle: {
//       color: "#999999"
//     }
//   },
//   tooltip: {
//     axisPointer: {
//       lineStyle: {
//         color: "#ccc",
//         width: 1
//       },
//       crossStyle: {
//         color: "#ccc",
//         width: 1
//       }
//     }
//   },
//   timeline: {
//     lineStyle: {
//       color: "#893448",
//       width: 1
//     },
//     itemStyle: {
//       normal: {
//         color: "#893448",
//         borderWidth: 1
//       },
//       emphasis: {
//         color: "#ffb248"
//       }
//     },
//     controlStyle: {
//       normal: {
//         color: "#893448",
//         borderColor: "#893448",
//         borderWidth: 0.5
//       },
//       emphasis: {
//         color: "#893448",
//         borderColor: "#893448",
//         borderWidth: 0.5
//       }
//     },
//     checkpointStyle: {
//       color: "#eb8146",
//       borderColor: "rgba(255,178,72,0.41)"
//     },
//     label: {
//       normal: {
//         textStyle: {
//           color: "#893448"
//         }
//       },
//       emphasis: {
//         textStyle: {
//           color: "#893448"
//         }
//       }
//     }
//   },
//   visualMap: {
//     color: [
//       "#893448",
//       "#d95850",
//       "#eb8146",
//       "#ffb248",
//       "#f2d643",
//       "rgb(247,238,173)"
//     ]
//   },
//   dataZoom: {
//     backgroundColor: "rgba(255,255,255,0)",
//     dataBackgroundColor: "rgba(255,178,72,0.5)",
//     fillerColor: "rgba(255,178,72,0.15)",
//     handleColor: "#ffb248",
//     handleSize: "100%",
//     textStyle: {
//       color: "#333"
//     }
//   },
//   markPoint: {
//     label: {
//       normal: {
//         textStyle: {
//           color: "#ffffff"
//         }
//       },
//       emphasis: {
//         textStyle: {
//           color: "#ffffff"
//         }
//       }
//     }
//   }
// };

