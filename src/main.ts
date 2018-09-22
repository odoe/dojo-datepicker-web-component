import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';

import DatePicker from './widgets/DatePicker';

import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

class App extends WidgetBase {
  protected render() {
    return v('div', [
      w(DatePicker, { selectedDate: new Date() })
    ]);
  }
}

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
