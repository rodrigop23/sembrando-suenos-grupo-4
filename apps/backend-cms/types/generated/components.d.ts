import type { Schema, Struct } from '@strapi/strapi';

export interface ActivityRequirements extends Struct.ComponentSchema {
  collectionName: 'components_activity_requirements';
  info: {
    description: '';
    displayName: 'Requirements';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ActivitySchedule extends Struct.ComponentSchema {
  collectionName: 'components_activity_schedules';
  info: {
    displayName: 'Schedule';
  };
  attributes: {
    description: Schema.Attribute.String;
    time: Schema.Attribute.Time;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'activity.requirements': ActivityRequirements;
      'activity.schedule': ActivitySchedule;
    }
  }
}
