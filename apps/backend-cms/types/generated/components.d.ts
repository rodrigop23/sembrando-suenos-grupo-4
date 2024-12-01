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

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMission extends Struct.ComponentSchema {
  collectionName: 'components_elements_missions';
  info: {
    description: '';
    displayName: 'Mission';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<['Heart', 'Users', 'BookOpen']> &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsProyect extends Struct.ComponentSchema {
  collectionName: 'components_elements_proyects';
  info: {
    displayName: 'Proyect';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['Facebook', 'Twitter', 'Linkedin', 'Mail']
    >;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_members';
  info: {
    description: '';
    displayName: 'Team Member';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    job: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    socialLink: Schema.Attribute.Component<'elements.social-link', true>;
  };
}

export interface LayoutGetInvolvedSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_get_involved_sections';
  info: {
    description: '';
    displayName: 'Get Involved Section';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    donationButton: Schema.Attribute.Component<'elements.link', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    volunteerButton: Schema.Attribute.Component<'elements.link', false> &
      Schema.Attribute.Required;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'elements.link', false> &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutMissionSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_mission_sections';
  info: {
    description: '';
    displayName: 'Missions Section';
  };
  attributes: {
    missions: Schema.Attribute.Component<'elements.mission', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutProyectSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_proyect_sections';
  info: {
    description: '';
    displayName: 'Proyects Section';
  };
  attributes: {
    proyects: Schema.Attribute.Component<'elements.proyect', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'activity.requirements': ActivityRequirements;
      'activity.schedule': ActivitySchedule;
      'elements.link': ElementsLink;
      'elements.mission': ElementsMission;
      'elements.proyect': ElementsProyect;
      'elements.social-link': ElementsSocialLink;
      'elements.team-member': ElementsTeamMember;
      'layout.get-involved-section': LayoutGetInvolvedSection;
      'layout.hero-section': LayoutHeroSection;
      'layout.mission-section': LayoutMissionSection;
      'layout.proyect-section': LayoutProyectSection;
    }
  }
}
