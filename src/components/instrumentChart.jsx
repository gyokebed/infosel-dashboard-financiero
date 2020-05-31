import React, { useState } from "react";

import Chart, {
  Series,
  Aggregation,
  ArgumentAxis,
  Grid,
  Label,
  ValueAxis,
  Margin,
  Legend,
  Tooltip,
} from "devextreme-react/chart";

import RangeSelector, {
  Size,
  Scale,
  Chart as RsChart,
  ValueAxis as RsValueAxis,
  Series as RsSeries,
  Aggregation as RsAggregation,
  Behavior,
} from "devextreme-react/range-selector";

const InstrumentChart = ({ data, currentInstrument }) => {
  const [visualRange, setVisualRange] = useState({});
  const updateVisualRange = (e) => {
    setVisualRange(e.value);
  };

  return (
    <div id="chart-demo">
      <Chart id="zoomedChart" dataSource={data} title={currentInstrument}>
        <Series
          type="candleStick"
          openValueField="Open"
          highValueField="High"
          lowValueField="Low"
          closeValueField="Close"
          argumentField="Date"
        >
          <Aggregation enabled={true} />
        </Series>
        <ArgumentAxis
          visualRange={visualRange}
          valueMarginsEnabled={false}
          argumentType="datetime"
        >
          <Grid visible={true} />
          <Label visible={false} />
        </ArgumentAxis>
        <ValueAxis valueType="numeric" />
        <Margin right={10} />
        <Legend visible={false} />
        <Tooltip enabled={true} />
      </Chart>
      <RangeSelector dataSource={data} onValueChanged={updateVisualRange}>
        <Size height={120} />
        <RsChart>
          <RsValueAxis valueType="numeric" />
          <RsSeries type="line" valueField="Open" argumentField="Date">
            <RsAggregation enabled="true" />
          </RsSeries>
        </RsChart>
        <Scale
          placeholderHeight={20}
          minorTickInterval="month"
          tickInterval="year"
          valueType="datetime"
          aggregationInterval="week"
        />
        <Behavior snapToTicks={false} callValueChanged="onMoving" />
      </RangeSelector>
    </div>
  );
};

export default InstrumentChart;
